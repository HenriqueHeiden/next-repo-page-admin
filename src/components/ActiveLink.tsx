import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

interface ActionLinkProps extends LinkProps {
    children: ReactElement
}
export function ActiveLink({ children, ...rest }: ActionLinkProps) {

    const { asPath } = useRouter();
    let isActive = asPath === rest.href || asPath === rest.as;



    return (
        <Link {...rest}>
            {cloneElement(children, {
                color: isActive ? 'cyan.400' : 'gray.50'
            })}
        </Link>
    )
}