import "../css/footer.css";

export default function Footer() {
  //Shows a footer at the bottom of a screen
  return (
    <footer className="text-center text-lg-start text-muted">
      <div className="d-flex extra justify-content-center align-items-center justify-content-lg-center p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with me on social networks:</span>
        </div>
        <div className="ml-4">
          <a
            href="https://www.instagram.com/noellanechelput/?hl=nl"
            target="_blank"
            className="btn btn-primary btn-floating m-1 text-reset instagram"
            role="button"
            rel="noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      <div className="copyright text-center p-4">
        © 2021 Copyright: Noëlla Nechelput
      </div>
    </footer>
  );
}
