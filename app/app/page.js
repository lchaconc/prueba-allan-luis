import Link from "next/link";

export default function Page() {
  return (
    <>
      <div class="justify-content-between bg-dark p-3">
      <button className="btn btn-light btn-secondary me-2" type="button">
            <Link href="/usuarios">Usuarios</Link>
          </button>
          <button className="btn btn-light btn-secondary" type="button">
            <Link href="/prueba">Prueba</Link>
          </button>

      </div>
    </>
  );
}
