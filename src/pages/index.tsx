import appPreviewImg from "../assets/copa-preview.png";
import logoImg from "../assets/logo.svg";
import avatarUsersImg from "../assets/user-avatares-exemple.png";
import iconCheck from "../assets/icon-check.svg";
import Image from "next/image";
import { api } from "../lib/axios";
import { FormEvent, useState } from "react";

interface HomeProps {
  poolCount: number;
  guessesCount: number;
  usersCount: number;
}

export default function Home(props: HomeProps) {
  const { poolCount, guessesCount, usersCount } = props;

  const [poolTitle, setPoolTitle] = useState("");

  async function createPool(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await api.post("/pools", {
        title: poolTitle,
      });

      const { code } = response.data;

      navigator.clipboard.writeText(code);

      alert("Bolão criado com sucesso! O código foi copiado para a área de transferência.");

      setPoolTitle("");
    } catch (error) {
      console.log(error);
      alert("Falha ao criar bolão, tente novamente!");
    }

  }

  return (
    <div className="max-w-screen-lg h-screen mx-auto grid grid-cols-2 items-center gap-28">
      <main>
        <Image src={logoImg} alt="NLW Copa" />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={avatarUsersImg} alt="NLW Copa" />

          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{usersCount}</span> pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2">

          <input onChange={event => setPoolTitle(event.target.value)} value={poolTitle} className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100" type="text" required placeholder="Qual nome do seu bolão?" />

          <button className="bg-yellow-500 hover:bg-yellow-600 px-6 py-4 rounded text-gray-900 font-bold text-sm" type="submit">CRIAR MEU BOLÃO </button>

        </form>

        <p className="mt-4 text-sm gray-300 leading-relaxed text-gray-100">Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={iconCheck} alt="" />
            <div className="flex flex-col">
              <span className="text-gray-100 text-2xl">+{poolCount}</span>
              <span className="text-gray-100">Bolões Criados</span>
            </div>
          </div>

          <div className="w-px h-10 bg-gray-600"></div>

          <div className="flex items-center gap-6">
            <Image src={iconCheck} alt="" />
            <div className="flex flex-col">
              <span className="text-gray-100 text-2xl">+{guessesCount}</span>
              <span className="text-gray-100">Palpites enviados</span>
            </div>
          </div>
        </div>

      </main>
      <Image src={appPreviewImg} alt="" />
    </div>
  )
}

export const getServerSideProps = async () => {
  const [poolCountResponse, guessesCountResponse, usersCountResponse] = await Promise.all([
    api.get("pools/count"),
    api.get("guesses/count"),
    api.get("users/count"),
  ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessesCount: guessesCountResponse.data.count,
      usersCount: usersCountResponse.data.count,
    }
  }
};