import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/navbar/navbar'
//as you can see here Layout is our topmost component 
//all other component is inside it 

export default function Home() {
  return (
    <Navbar title="KNPSS" >
      <div>That Page Content</div>
    </Navbar>
  )
}
