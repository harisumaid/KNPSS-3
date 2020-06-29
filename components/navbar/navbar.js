import Head from 'next/head'
import { Layout, Menu } from 'antd'
import Link from 'next/link'
//as you can see here Layout is our topmost component 
//all other component is inside it 


const { Header, Content } = Layout;

export default function Navbar({ children, title }) {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div />
        <Menu theme="light" mode="horizontal" >
          <Menu.Item key="5">
            <img src="/pine-tree.svg" style={{ height: '24px' }} alt="Vercel Logo" className="logo" />
            <Link href="/">
              <a>
                KNPSS
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link href="/achievements">
              <a>
                Achievements
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/news">
              <a>
                In The News
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link href="/office-bearer">
              <a>
                Office Bearer
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link href="/gallery">
              <a>
                Gallery
              </a>
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div>
          {children}
        </div>
      </Content>
    </Layout>
  )
}
