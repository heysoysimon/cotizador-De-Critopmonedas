import {useState,useEffect} from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectMonedas from './hooks/useSelectMonedas'


const InputSubmit = styled.input`
        background-color: #9497FF;
        border: none;
        width: 100%;
        padding: 10px;
        color: #FFF;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 20px;
        border-radius: 5px;
        transition: bacground-color .3ss ease;
        margin-top: 30px;

         &:hover{
             background-color: #7a7dfe;
             cursor: pointer;
         }
`
const Formulario = ({setMonedas}) => {

  const [criptos, setCriptos] = useState([])
  const [error, setError] = useState(false)

  const monedas =[
    {id: 'USD', nombre: 'Dolar de estados unidos'},
    {id: 'EUR', nombre: 'Euro'},
    {id: 'VES', nombre: 'Bolivar Digital'}

  ]

  const [ moneda, SelectMonedas] = useSelectMonedas('elije tu moneda', monedas)
  const [ critopmoneda, SelectCritopmoneda] = useSelectMonedas('elije tu criptomoneda ', criptos)
  
useEffect(() => {
    const consultarAPI = async () => {
        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        const arrayCriptos = resultado.Data.map( cripto => {

            const objeto ={
                /* iterar y crear  objecto de monedas y arrayCriptos */
              id: cripto.CoinInfo.Name,
              nombre: cripto.CoinInfo.FullName
            }
          return objeto 

        })
         setCriptos(arrayCriptos)
    }
    consultarAPI()
},[])
  SelectMonedas()

const handleSubmit = e =>{
  e.preventDefault()

  if([moneda, critopmoneda].includes('')){
   setError(true)

    return
    
  }

  setError(false)

  setMonedas({
    moneda,
    critopmoneda
  })
  /* console.log(moneda);
  console.log(critopmoneda) */
}

  return (
    <>
{error && <Error> Todos los Campos son obligatorios</Error>}

 <form
    onSubmit={handleSubmit}
 >

      <SelectMonedas/> 
      <SelectCritopmoneda/>

      
     <InputSubmit type="submit"
      value="cotizar"
      ></InputSubmit>
 </form>
 </>
  )
}

export default Formulario
