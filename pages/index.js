import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="container">
      <h2>Elton's Test For MuchSkill</h2>
      <div className={styles.links}>
        <Link href="/techtools">
          <a className="button btn-black">TechTools</a>
        </Link>
        <Link href="/departments">
          <a className="button btn-black">Departments</a>
        </Link>
      </div>
    </div>
  )
}
