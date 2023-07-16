import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import Content from "./Content";
import SideDashboard from "./SideDashboard";
export default function HomePage() {
    // ! toggle profile on mobile screen
    const [Toggle, setToggle] = useState<boolean>(false)
    const handleToggle = () => {
        setToggle(!Toggle)
    }
    const navigate = useNavigate();
    useEffect(() => {
        let userid = sessionStorage.getItem('UserId')
        if (userid) {
            navigate("/Home")
        }
        else if (!userid) {
            navigate('/')
        }
    }, [])
    return (
        <main className="bg-white flex justify-between gap-[5%]">
            <section
                className="bg-white w-[30%]"
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis corrupti obcaecati incidunt sed debitis saepe maxime tempora beatae aperiam quas hic, voluptatem recusandae animi magnam iure ad. Voluptate accusantium commodi necessitatibus laudantium maiores nobis ratione, voluptas earum id cum, quibusdam ipsum vel dignissimos ullam magni alias optio expedita explicabo eum pariatur. Exercitationem, perferendis ad. Ipsum officiis consectetur repellat excepturi aut blanditiis qui cum magni error, eos asperiores similique sunt saepe ex repellendus nihil? Iusto reprehenderit temporibus magni earum provident suscipit adipisci vel voluptatum eum? Soluta aspernatur atque, nobis, dignissimos modi culpa optio exercitationem voluptas libero at vero? Itaque quam iste iusto! Reprehenderit ullam consequatur, quia voluptas, nam dolorem dignissimos natus quam nemo cum numquam neque autem sunt praesentium et vero id sequi at quaerat ex consequuntur reiciendis. Fugiat, alias fuga! Magnam tempora necessitatibus quos quisquam. Consectetur dolorum nesciunt repellendus maxime nostrum odit maiores a et voluptas facilis magnam neque velit totam repudiandae non adipisci, molestiae suscipit fugit accusamus dicta provident praesentium perferendis veniam? Odit provident quasi sed voluptates quo reprehenderit, ipsam, neque repellat, ducimus sunt iusto soluta. Facere doloremque accusantium rem magnam libero aliquam enim illum! Placeat, est! Nostrum vero eaque laborum molestias illo eveniet quae iusto unde, consequatur rem adipisci quisquam ab, sapiente optio ipsum enim fuga exercitationem commodi animi perferendis vel modi pariatur! Magni, atque? Quae eum enim eos consequuntur!
                <Dashboard />
            </section>
            <section
                className="bg-white w-[35%]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis corrupti obcaecati incidunt sed debitis saepe maxime tempora beatae aperiam quas hic, voluptatem recusandae animi magnam iure ad. Voluptate accusantium commodi necessitatibus laudantium maiores nobis ratione, voluptas earum id cum, quibusdam ipsum vel dignissimos ullam magni alias optio expedita explicabo eum pariatur. Exercitationem, perferendis ad. Ipsum officiis consectetur repellat excepturi aut blanditiis qui cum magni error, eos asperiores similique sunt saepe ex repellendus nihil? Iusto reprehenderit temporibus magni earum provident suscipit adipisci vel voluptatum eum? Soluta aspernatur atque, nobis, dignissimos modi culpa optio exercitationem voluptas libero at vero? Itaque quam iste iusto! Reprehenderit ullam consequatur, quia voluptas, nam dolorem dignissimos natus quam nemo cum numquam neque autem sunt praesentium et vero id sequi at quaerat ex consequuntur reiciendis. Fugiat, alias fuga! Magnam tempora necessitatibus quos quisquam. Consectetur dolorum nesciunt repellendus maxime nostrum odit maiores a et voluptas facilis magnam neque velit totam repudiandae non adipisci, molestiae suscipit fugit accusamus dicta provident praesentium perferendis veniam? Odit provident quasi sed voluptates quo reprehenderit, ipsam, neque repellat, ducimus sunt iusto soluta. Facere doloremque accusantium rem magnam libero aliquam enim illum! Placeat, est! Nostrum vero eaque laborum molestias illo eveniet quae iusto unde, consequatur rem adipisci quisquam ab, sapiente optio ipsum enim fuga exercitationem commodi animi perferendis vel modi pariatur! Magni, atque? Quae eum enim eos consequuntur!
                <Content />
            </section>
            <section
                className="bg-white  w-[30%]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis corrupti obcaecati incidunt sed debitis saepe maxime tempora beatae aperiam quas hic, voluptatem recusandae animi magnam iure ad. Voluptate accusantium commodi necessitatibus laudantium maiores nobis ratione, voluptas earum id cum, quibusdam ipsum vel dignissimos ullam magni alias optio expedita explicabo eum pariatur. Exercitationem, perferendis ad. Ipsum officiis consectetur repellat excepturi aut blanditiis qui cum magni error, eos asperiores similique sunt saepe ex repellendus nihil? Iusto reprehenderit temporibus magni earum provident suscipit adipisci vel voluptatum eum? Soluta aspernatur atque, nobis, dignissimos modi culpa optio exercitationem voluptas libero at vero? Itaque quam iste iusto! Reprehenderit ullam consequatur, quia voluptas, nam dolorem dignissimos natus quam nemo cum numquam neque autem sunt praesentium et vero id sequi at quaerat ex consequuntur reiciendis. Fugiat, alias fuga! Magnam tempora necessitatibus quos quisquam. Consectetur dolorum nesciunt repellendus maxime nostrum odit maiores a et voluptas facilis magnam neque velit totam repudiandae non adipisci, molestiae suscipit fugit accusamus dicta provident praesentium perferendis veniam? Odit provident quasi sed voluptates quo reprehenderit, ipsam, neque repellat, ducimus sunt iusto soluta. Facere doloremque accusantium rem magnam libero aliquam enim illum! Placeat, est! Nostrum vero eaque laborum molestias illo eveniet quae iusto unde, consequatur rem adipisci quisquam ab, sapiente optio ipsum enim fuga exercitationem commodi animi perferendis vel modi pariatur! Magni, atque? Quae eum enim eos consequuntur!
                <SideDashboard />
            </section>
        </main>
    )
}
