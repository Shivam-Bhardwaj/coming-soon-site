export default function Home() {
  return (
    <main className="container">
      <div className="content">
        <h1 className="title">Coming Soon</h1>
        <p className="subtitle">is coming soon</p>
        <p className="description">
          Because I am working on the coming soon part,<br />
          which in itself is elaborate.
        </p>
        <div className="loader">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <div className="social-link">
          <a 
            href="https://x.com/LazyShivam" 
            target="_blank" 
            rel="noopener noreferrer"
            className="x-link"
          >
            Follow me on X
          </a>
        </div>
      </div>
    </main>
  )
}

