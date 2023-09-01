interface Props {
    post: any
}
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function PostedCode({ post }: Props) {
    const codes = post.Code.split('\n');
    const codeString = codes.join('\n'); 
    return (
        <main>
            <article className=" py-2">
                <div className='h-80 px-1 overflow-auto codescroll w-full'>
                    <SyntaxHighlighter className='codescroll' showLineNumbers={true} language="javascript" style={vscDarkPlus}>
                        {codeString}
                    </SyntaxHighlighter>
                </div>
            </article>
        </main>
    )
}