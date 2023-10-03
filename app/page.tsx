import HomePageCardButton from "@/app/components/HomePageCardButton";
import React from "react";

export default function Home() {

    return (
        <main className="flex flex-col items-center justify-between">
            <div
                className="mb-32 grid text-center lg:max-w-7xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left lg:gap-24">
                <div className={"bg-ambrosia bg-opacity-90 rounded-2xl p-5 m-5"}>
                    <div className={"p-10"}>
                        <h3 className={"mb-3 text-4xl font-semibold"}>Besoin d&#39;un chef ?</h3>
                        <p>Commencez dès maintenant à chercher quelqu&#39;un autour de chez vous pour vous préparez de
                            bons
                            petits plats</p>
                    </div>
                    <HomePageCardButton title={"Vite mon chef"}
                                        description={"Cherchez un chef pour préparez vos plats"}
                                        link={"/findMyChief"}/>
                </div>
                <div className={"bg-white bg-opacity-90 rounded-2xl p-5 m-5 text-ambrosia"}>
                    <div className={"p-10"}>
                        <h3 className={"mb-3 text-4xl font-semibold"}>Féru de cuisine ?</h3>
                        <p>Inscrivez vous dès maintenant en tant que chef et faites valoir vos compétences tout en
                            facilitant
                            la vie des autres</p>
                    </div>
                    <HomePageCardButton title={"Aux fourneaux"}
                                        description={"Commencez à faire profiter les autres de vos talents"}
                                        link={"/profile"}/>
                </div>

            </div>
        </main>
    )
}
