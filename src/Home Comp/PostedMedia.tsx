interface Props {
    post: any
}

export default function PostedMedia({post}:Props) {
    return(
        <main>
            <article className=" pt-2  px-2">
                <p className="">
                    {post.article}
                </p>
            </article>
        </main>
    )
}