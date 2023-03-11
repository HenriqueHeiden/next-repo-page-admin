import { NextApiRequest, NextApiResponse } from "next";
import { updatePerfil } from "../../../api/firestore";
import { stripe } from "../../services/stripe";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req: NextApiRequest, res: NextApiResponse) =>{
   
   const {method, body} = req;
   const priceId = body.params.priceId;
    if(method === 'POST'){
        let customerId = await body.params.perfil[0].stripe_custumer_id;

        if(!customerId){
            const stripeCustumer = await stripe.customers.create({
                email:body.params.user.email,
            })
            customerId = stripeCustumer.id;
            updatePerfil(body.params.user, customerId);
        }

        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer:customerId,
            payment_method_types:['card'],
            billing_address_collection:'auto',
            line_items:[
                {
                    price:priceId,
                    quantity:1
                }
            ],
            mode:"subscription",
            allow_promotion_codes: true,
            success_url:process.env.STRIP_SUCCESS_URL,
            cancel_url:process.env.STRIP_CANCEL_URL,

        })
        return res.status(200).json({sessionId: stripeCheckoutSession.id})
    }else{
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }
}