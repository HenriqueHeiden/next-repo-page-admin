import { getPerfilPerCustumerId, updatePlan } from "../../../../api/firestore";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
    subscriptionId: string,
    custumerId: string
){

    console.log("TESTE = > ",subscriptionId, custumerId);
    const user = await getPerfilPerCustumerId(custumerId);
    console.log("userid = > ", user);
    debugger;
    
   //Buscar o usuario dentro do firebase (stripe_custumer_id) 
   //salvar os dados da subscription no firebase
    
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    console.log("subscription = > ", subscription);
    updatePlan(user, subscription);
}