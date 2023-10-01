export default function layout({ children }) {
    return (
      <main className='h-screen min-h-[640px] bg-[#00E2FF] ' style={{ background: 'linear-gradient(0deg, #ffffff 50%, #00E2FF 50%)' }}>
        <div className='relative top-[8vh]  md:top-[5vh] lg:top-[3vh] w-full text-center flex justify-center bg-transparent py-5'>
          <img src="/logo.png" className='h-[80px]' alt="User" />
        </div>
        <div className="h-full " >
                {/* <div className='w-full text-center flex justify-center bg-[#00E2FF] py-5'>
          <img src="/logo.png" className='h-[80px]' alt="User" />
        </div> */}
                <div className='w-screen h-full  flex flex-col justify-center items-center p-5 '>


                    <form className={`w-full max-w-[450px] md:max-w-[600px] space-y-4 shadow-2xl bg-white shadow rounded-[20px] px-5 py-10 md:mt-[0px] md:grid md:grid-cols-2 md:gap-[5px]`} onSubmit={!isDisable ? signInHandler : (e) => e.preventDefault()} >
                        {/* <form className={`w-full max-w-[450px] space-y-4 border-[1px] border-white shadow-2xl shadow-white px-5 py-10`} onSubmit={!isDisable ? signInHandler : (e) => e.preventDefault()} > */}
                        <h5 className="text-[18px] text-center text-gray-800 md:col-span-2" >Registrate</h5>
                        
                        <div>
                            <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-gray-800">Nombre</label>
                            <Input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" placeholder="" required />
                        </div>
                        
                       <div className="md:col-span-2">
                       <Button type="submit" theme="Primary"></Button>

                          </div>
                        <div className="text-[14px] text-center font-medium text-gray-800 md:col-span-2">Ya tienes una cuenta? <Link href="/Login" className="text-gray-400 underline" onClick={handleSignOut}>Inicia Sesión</Link ></div>
                    </form>
                </div>
                {success == 'AccountNonExist' && <Msg>Cuenta inexistente</Msg>}
                {success == 'CompleteEmail' && <Msg>Introduce tu email</Msg>}

                {success == 'Complete' && <Msg>Complete el formulario</Msg>}
            </div>
      </main>
    )
  }