import Link from 'next/link'

const Page = ({}) => {
    return (
        <>
            <h3 className={'message'}>
                the login feature has an unexpected issue, which is currently being fixed. for the meantime, you can
                take a
                look on the unique features that will be available for the logged in users
            </h3>

            <div className={'links'}>
                <Link href={'/disabled-login/create-post'} className={'link'}>Create Post</Link>
                <Link href={'/disabled-login/user-profile'} className={'link'}>User Profile</Link>
            </div>
        </>
    )
}

export default Page