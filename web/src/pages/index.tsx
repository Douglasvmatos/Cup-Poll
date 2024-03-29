interface HomeProps {
  poolCount: number,
  guessCount: number,
  usersCount: number,
}

import Image from 'next/image'
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import logoImg from '../assets/logo.svg'
import userAvatarExampleImg from '../assets/users-avatar-example.png'
import iconCheckImg from '../assets/icon-check.svg'
import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'

export default function Home(props: HomeProps) {

const [poolTitle, setPoolTitle] = useState('')

  async function createPool(event: FormEvent) {
    event.preventDefault()

   try {
    const response = await api.post('/pools', {
      title: poolTitle,
    })

    const { code } = response.data

    await navigator.clipboard.writeText(code)

    alert('Bolão criado com sucesso, o código foi copiado para área de transfêrencia')

    setPoolTitle('')

    } catch (err) {
      alert('Falha ao criar o bolão')
    }
  }

  return (
    <div className="h-screen max-w-6xl mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImg} alt="Logo" quality={100}/>
      <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
      Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>
      <div className="mt-10 flex items-center gap-2">
        <Image src={userAvatarExampleImg} alt="Avatares" quality={100}/>
        <strong className="text-gray-100 text-xl">
          <span className="text-ignite-500">+{props.usersCount}</span> pessoas já estão usando
        </strong>
      </div>
      <form onSubmit={createPool} className="mt-10 flex gap-2">
        <input 
        value={poolTitle}
        onChange={event => setPoolTitle(event.target.value)}
        className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
        type="text" 
        required 
        placeholder='Qual nome do seu bolão?'/>
        <button 
        className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700"
        type='submit'>
          Criar meu bolão
          </button>
      </form>
    
      <p className="mt-4 text-sm text-gray-300 leading-relaxed ">
        Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>
      <div className='mt-10 pt-10 border-t border-gray-600 flex justify-between items-center text-gray-100'>
        <div className="flex items-center gap-6">
          <Image src={iconCheckImg} alt="Check" quality={100}/>
          <div className="flex flex-col">
            <span className='font-bold text-2xl'>+{props.poolCount}</span>
            <span>Bolões criados</span>
          </div>
        </div>
        <div className='w-px h-10 bg-gray-500'/>
        <div className="flex items-center gap-6">
          <Image src={iconCheckImg} alt="Check" quality={100}/>
          <div className="flex flex-col">
            <span className='font-bold text-2xl'>+{props.guessCount}</span>
            <span>Palpites enviados</span>
          </div>
        </div>
      </div>
      </main>
        <Image src={appPreviewImg} alt="Dois celulares exibindo uma prévia" quality={100}/>
    </div>
  )
}

export const getServerSideProps = async () => {
  
  const [
      poolCountResponse, 
      guessCountResponse, 
      usersCountResponse 
    ] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count')
  ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      usersCount: usersCountResponse.data.count,
    }
  }
}