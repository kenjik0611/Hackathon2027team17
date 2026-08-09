interface HeaderProps {
  status: string;
  onHome: () => void;
}

export default function Header({ status, onHome }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="wordmark" type="button" onClick={onHome} aria-label="トップへ戻る">
          <span className="wordmark-mark" aria-hidden="true">MC</span>
          <span>モラルチェッカー</span>
        </button>
        <span className="status-badge">
          <span className="status-dot" aria-hidden="true" />
          {status}
        </span>
      </div>
    </header>
  );
}
