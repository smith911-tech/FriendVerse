interface Props {
    post: any
}

export default function PostedVideo({ post }: Props) {
    return (
        <main>
            <article className=" py-2">
                <video controls className="w-full h-80">
                    <source src={post.video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </article>
        </main>
    )
}