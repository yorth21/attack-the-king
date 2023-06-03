export function Info({ countMovimientos, listaAbierta, listaCerrada }) {
  return (
    <div className="info">
      <div className="info-group">
        <span className="info-title">MOVIMIENTOS</span>
        <span className="info-span">{countMovimientos}</span>
      </div>
      <div className="info-group">
        <span className="info-title">LISTA ABIERTA</span>
        <span className="info-span">{listaAbierta}</span>
      </div>
      <div className="info-group">
        <span className="info-title">LISTA CERRADA</span>
        <span className="info-span">{listaCerrada}</span>
      </div>
    </div>
  );
}
