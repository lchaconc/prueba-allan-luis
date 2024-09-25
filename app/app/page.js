"use client"
import Link from "next/link";

export default function page() {
  return (
    <div className="bg-dark text-success" style={ {"height" : "100vh" } } >


<div className="container ">
      <div className="row">
        <div className="col-12">
          <h1> Home </h1>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
          nesciunt voluptatum fugit vero officia iure minus aut, explicabo vitae
          nostrum voluptatibus officiis possimus error odit exercitationem
          ducimus, non nam sapiente.
        </div>
        <div className="col-sm-2">
          <Link href={"usuarios"} className="btn btn-success">
          Usuarios
          </Link>

          
        </div>
      </div>
    </div>

    </div>
  );
}
