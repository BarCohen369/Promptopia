import Link from 'next/link'

type LinkOwnProps<E extends React.ElementType> = {
    as?: E
    children: React.ReactNode
    setToggleDropdown: React.Dispatch<React.SetStateAction<boolean>>
}

type LinkProps<E extends React.ElementType> = LinkOwnProps<E> & Omit<React.ComponentProps<E>, keyof LinkOwnProps<E>>

export const MobileNavLink =
    <E extends React.ElementType = typeof Link>
    ({as, children, setToggleDropdown, ...props}:
         LinkProps<E>) => {
    const Element = as || Link

        // @ts-ignore
        return (
        <Element { ...props} onClick={() => setToggleDropdown(false)}>
            {children}
        </Element>
    )
}