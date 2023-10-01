'use client';

import Button from '@/components/Button'
import { useUser } from '@/context'
import { useRouter } from 'next/navigation';

export default function Card({ nombre1, nombre2, nombre3, costo, url, empresa, descripcion, i }) {

    const { user, userDB, distributorPDB, setUserDistributorPDB, setUserItem, item, setUserData, setUserSuccess, cart, setUserCart } = useUser()
    const router = useRouter()

    function seeMore(e) {
        setUserItem(i)
        router.push('/Producto')
    }

    const addCart = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setUserCart({ ...cart, [i.uuid]: { ...i, cantidad: 1 } })
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
    console.log(item)
    return (
        
            <tbody>
                <tr className="bg-white text-[12px] border-b hover:bg-gray-50 " >
                    <td className="px-3 py-4  flex flex-col text-[16px]  text-gray-700">
                        {i['nombre 1']} 
                        
                        <div className="flex w-full justify-center text-gray-900">
                            <span className="text-[16px]  text-gray-700  tracking-tight">{i.costo} Bs.</span>
                            {/* <span className="text-[16px]  text-gray-700  font-extrabold">   Bs.</span> */}
                        </div>
                    </td>
                    <td className="px-3 py-4  text-gray-900">
                        <div  className="lg:flex lg:w-full lg:justify-center">


                 
                        {cart && cart[i.uuid] && cart[i.uuid].cantidad !== undefined && cart[i.uuid].cantidad !== 0
                            ? <div className='flex w-[80px] items-center justify-center flex-col flex-col-reverse lg:flex-row lg:w-full lg:max-w-[150px] justify-between'>
                                <Button theme='MiniSecondary' click={(e) => addLessCart(e, i)}>-</Button>
                                <span className='px-4'>
                                    {cart && cart[i.uuid] && cart[i.uuid].cantidad !== undefined && cart[i.uuid].cantidad !== 0 && <span className='block text-[16px] text-center '>{cart[i.uuid].cantidad}</span>}
                                </span>
                                <Button theme='MiniPrimary' click={(e) => addPlussCart(e, i)}>+</Button>
                            </div>
                            : <Button theme='MiniPrimary' click={(e) => addCart(e, i)}>Comprar</Button>
                        } 
                              </div>
                    </td>
                    <td className="px-3 py-4 font-semibold text-gray-900">
                        <div className="flex items-baseline text-gray-900">
                            <span className="text-[16px]  text-gray-700  tracking-tight">{ cart && cart[i.uuid] && cart[i.uuid].cantidad !== undefined ? cart[i.uuid].cantidad * i.costo : i.costo } Bs.</span>
                            {/* <span className="text-[16px]  text-gray-700  font-extrabold">   Bs.</span> */}
                        </div>
                    </td>
                </tr>

            </tbody>
    )
}




