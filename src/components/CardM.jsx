'use client';

import Button from '@/components/Button'
import { useUser } from '@/context'
import { useRouter } from 'next/navigation';

export default function Card({ i, recetado, detalle }) {

    const { user, userDB, distributorPDB, setUserDistributorPDB, setUserItem, item, setUserData, setUserSuccess, cart, setUserCart, modal, setModal, setFilter } = useUser()
    const router = useRouter()

    function seeMore(e) {
        setUserItem(i)
        router.push('/Producto')
    }

    // const addCart = (e) => {
    //     e.preventDefault()
    //     e.stopPropagation()
    //     setUserCart({ ...cart, [i.uuid]: { ...i, cantidad: 1 } })
    // }
    const addCart = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (user.rol == 'Clinica' && userDB && userDB.autorizacion == false) {
            setModal('Auth')
            return
        }
        user && user.rol !== 'Cliente' && (userDB == null || userDB == undefined)
            ? setModal('VerificaM')
            : setUserCart({ ...cart, [i.uuid]: { ...i, cantidad: detalle !== undefined ? detalle.cantidad : 1 } })

        if (detalle !== undefined) {
            setFilter('')
        }
    }
    const addPlussCart = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setUserCart({ ...cart, [i.uuid]: { ...i, cantidad: cart[i.uuid].cantidad + 1 } })
    }
    const addLessCart = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const obj = { ...cart }
        delete obj[i.uuid]
        console.log(obj)

        cart[i.uuid].cantidad - 1 == 0
            ? setUserCart(obj)
            : setUserCart({ ...cart, [i.uuid]: { ...i, cantidad: cart[i.uuid].cantidad - 1 } })
    }
    return (

        <div className="relative w-full bg-gray-50 min-h-[180px] max-w-[500px] rounded-[15px] rounded-[20px] rounded-bl-[10px] shadow-sm shadow-[#2A52BE] mt-5 overflow-hidden" onClick={(e) => seeMore(e, i)} style={{ display: 'grid', gridTemplateColumns: 'auto 150px', gridAutoFlow: 'dense' }}>
            <div className=" font-bold text-[16px] bg-[#32CD32] flex flex-col w-full justify-between items-between text-gray-950 col-span-2 p-5">
                <div className=" font-bold text-[16px]  text-gray-950">
                    {i['nombre de producto 1']}
                </div>
                {i['nombre de producto 2'] && <div className=" font-regular text-[14px]  text-gray-950">
                    {i['nombre de producto 2']}
                </div>}
                {i['nombre de producto 3'] && <div className=" font-regular text-[14px] text-gray-950">
                    {i['nombre de producto 3']}
                </div>}
            </div>

            <div className=" p-4 pt-4  flex flex-col justify-start leading-normal">

                {i.categoria !== 'Otros' && <p className="text-gray-700 text-[16px] pb-[10px] font-bold">{i.categoria}</p>}
                <div className="">
                    <p className="text-gray-700 text-[12px]">{i['descripcion basica']}</p>
                </div>
            </div>
            <div>
                <div className="relative w-[150px] rounded-t text-center" >
                    <img src={i.url} className='w-150px' alt="" />
                    {recetado === true && <span className='absolute text-[16px] font-bold right-10 top-10 text-green-600 transform rotate-[-45deg]'>Recomendado <br /> por tu doctor</span>}
                </div>
                <div className='flex py-4 pr-4'>
                    <span className={`block text-center w-full text-14 p-2 rounded-[5px] text-[12px] leanding-[0px]`}>
                        Entrega {i.disponibilidad.toLowerCase()}
                    </span>
                </div>
            </div>
            <div className='w-full flex justify-between  items-center p-4'>
                <div className="flex items-baseline text-gray-900">
                    <div className="flex items-baseline text-gray-900 bg-white rounded-full px-5 py-2">

                        <span className="text-[18px]  text-gray-600 font-extrabold tracking-tight">{i.costo}</span>
                        <span className="text-[14px] text-gray-600 font-semibold">BS</span>
                    </div>
                </div>
            </div>
            <div className='flex py-4 pr-4'>
                {cart && cart[i.uuid] && cart[i.uuid].cantidad !== undefined && cart[i.uuid].cantidad !== 0
                    ? <div className='flex w-full'>
                        <Button theme='MiniPrimary' click={(e) => addLessCart(e, i)}>-</Button>
                        {cart && cart[i.uuid] && cart[i.uuid].cantidad !== undefined && cart[i.uuid].cantidad !== 0 && <span className='flex justify-center items-center text-[16px] text-right px-5 w-[40px] font-bold'> {cart[i.uuid].cantidad} </span>}
                        <Button theme='MiniSuccess' click={(e) => addPlussCart(e, i)}>+</Button>
                    </div>
                    : <Button theme='MiniSuccessRecetar' click={(e) => addCart(e, i)}>Recetar</Button>
                }
            </div>
        </div>
    )
}



