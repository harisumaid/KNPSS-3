import Head from 'next/head'
import Link from 'next/link'
import style from './navbar.module.css'
import { Menu, Segment } from 'semantic-ui-react'

//as you can see here Layout is our topmost component 
//all other component is inside it 

export default function Navbar({ children, title }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Menu pointing secondary>

        <Menu.Item name='KNPSS'>
          <Link href="/">
            <a>KNPSS</a>
          </Link>
        </Menu.Item>


        <Menu.Item name='Achievements'>
          <Link href="/achievements">
            <a>
              Achievements
          </a>
          </Link>
        </Menu.Item>


        <Menu.Item name='In the news'>
          <Link href="/news">
            <a>
              In the news
          </a>
          </Link>
        </Menu.Item>

        <Menu.Item name='Office Bearers'>
          <Link href="/office-bearer">
            <a>
              Office Bearer
          </a>
          </Link>
        </Menu.Item>

        <Menu.Item name='About us'>
          <Link href="/about">
            <a>
              About us
          </a>
          </Link>
        </Menu.Item>

      </Menu>

      <Segment>
        {children}
      </Segment>

    </div>
  )
}
