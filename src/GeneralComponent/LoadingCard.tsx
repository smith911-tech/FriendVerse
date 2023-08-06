import useThemeStore from '../Usetheme';
export function SmallCard() {
    const theme = useThemeStore((state: any) => state.theme);
    return(
        <div className="smallcard">
            <section className={`card ${theme ? "bg-[#000]" : "bg-[#fff]"}`}>
                <div className={`linear-background ${theme ? "bg-[black]" : "bg-[#f6f7f8]"}`}>
                    <div className={`${theme ? "bg-[#000]" : "bg-[#fff]"} inter-draw`}></div>
                    <div className={`${theme ? "bg-[#000]" : "bg-[#fff]"} inter-crop`}></div>
                    <div className={`${theme ? "bg-[#000]" : "bg-[#fff]"} inter-right--top`}></div>
                    <div className={`${theme ? "bg-[#000]" : "bg-[#fff]"} inter-right--bottom`}></div>
                </div>
            <div className="card__skeleton">
                <div className="card-title">
                    <div className="card__description">
                    </div>
                </div>
            </div>
                <div className="card__skeleton">
                    <div className="card-title">
                    </div>
                </div>
                <div className="card__skeleton">
                    <div className="card-title">
                    </div>
                </div>
                <div className="card__skeleton">
                    <div className="card-title">
                    </div>
                </div>
        </section>
        </div>
    )
}

export function LongCard() {
    const theme = useThemeStore((state: any) => state.theme);
    return (
        <div className="smallcard">
            <section className={`card ${theme ? "bg-[#000]" : "bg-[#fff]"}`}>
                <div className={`linear-background ${theme ? "bg-[black]" : "bg-[#f6f7f8]"}`}>
                    <div className={`${theme ? "bg-[#000]" : "bg-[#fff]"} inter-draw`}></div>
                    <div className={`${theme ? "bg-[#000]" : "bg-[#fff]"} inter-crop`}></div>
                    <div className={`${theme ? "bg-[#000]" : "bg-[#fff]"} inter-right--top`}></div>
                    <div className={`${theme ? "bg-[#000]" : "bg-[#fff]"} inter-right--bottom`}></div>
                </div>
                <div className="card__skeleton">
                    <div className="card-title">
                        <div className="card__description">
                        </div>
                    </div>
                </div>
                <div className="card__skeleton">
                    <div className="card-title">
                    </div>
                </div>
                <div className="card__skeleton">
                    <div className="card-title">
                    </div>
                </div>
                <div className="card__skeleton">
                    <div className="card-title">
                    </div>
                </div>
                <div className="card__skeleton">
                    <div className="card-title">
                    </div>
                </div>
                <div className="card__skeleton">
                    <div className="card-title">
                    </div>
                </div>
                <div className="card__skeleton">
                    <div className="card-title">
                    </div>
                </div>
                <div className="card__skeleton">
                    <div className="card-title">
                    </div>
                </div>
                <div className="card__skeleton">
                    <div className="card-title">
                    </div>
                </div>
            </section>
        </div>
    )
}