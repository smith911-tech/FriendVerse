import { useThemeStore } from '../Zustand';
export default function RePost() {
    const theme = useThemeStore((state: any) => state.theme);
    return (
        <main className={` mt-3 ${theme ? "bg-[#1b1d21] text-[#ffff]" : "bg-[#f0f2f5]  text-[#000000]"}`}>
            Reverb Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum saepe molestiae consectetur quia accusantium totam corporis earum quisquam minus, porro aliquam nesciunt vel incidunt soluta natus nostrum, perspiciatis amet quod voluptates quae rerum a itaque commodi. Molestiae aspernatur possimus amet culpa quidem, rerum delectus ipsa? Voluptatum, consequatur sunt doloribus nostrum consequuntur iusto ducimus, aperiam id reiciendis ipsam dolore itaque. A, odit, aperiam facilis repellendus, dolor aliquid consequuntur excepturi asperiores cum praesentium laboriosam voluptatibus! Libero nostrum, molestias iusto magnam delectus ex quae obcaecati quas maxime accusamus quo, sequi aut dicta voluptate? Quas eos facilis consectetur, laudantium facere ut suscipit harum nesciunt.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut illum fugiat officiis error aspernatur, iusto odio aliquam blanditiis ipsa eligendi. Ea et earum ab iure voluptatum, est omnis accusantium pariatur placeat eum ipsum nesciunt, hic id architecto quisquam ad error molestiae, cupiditate ducimus sapiente nam ipsa consequuntur! Tempore officiis numquam quam minus architecto porro, beatae cum commodi ullam magni dolore quod reprehenderit ratione quae hic tempora voluptates, eaque magnam. Dolore veniam perferendis possimus minima, delectus expedita praesentium? Voluptatum illo numquam neque ea in quod laborum eveniet soluta dolorem a ab velit est tenetur veniam, at excepturi, esse omnis! Ducimus, distinctio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam tempore ipsum expedita neque pariatur nulla amet cum aspernatur quisquam sequi iusto eos exercitationem, ab ad consectetur, nobis obcaecati voluptatem at quod praesentium ullam consequuntur aliquid nemo ducimus! Porro iure deserunt et necessitatibus optio voluptatum quos nulla quis, corporis nihil dolorum quo hic ipsum officia repudiandae. Iusto obcaecati numquam voluptas eligendi sed provident, ut nesciunt at? Totam, cumque ipsum laudantium doloremque iure ab earum mollitia beatae aliquid odit! Pariatur commodi illo ea atque enim animi facilis sint, non possimus maiores nemo suscipit vitae iste? Pariatur eligendi architecto officia ullam ipsa eaque.
        </main>
    )
}