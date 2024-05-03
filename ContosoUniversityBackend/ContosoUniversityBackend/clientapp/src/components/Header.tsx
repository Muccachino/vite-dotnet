import { Link } from 'react-router-dom';

interface Props {
  headerBackground: string;
  headerColor: string
}

export default function Header({ headerBackground, headerColor }: Props) {


  return (
    <div
      role="presentation"
      style={{backgroundColor: `${headerBackground}`, borderBottom: "2px solid black"}}
    >
      <div
        style={{
        height: "60px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        margin: "0 20vw",
        padding: "10px"
      }}
      >
      <Link style={{ fontSize: "1.5rem", color: `${headerColor}`, textDecoration: "none" }} className="nav-element" to={"/app"}>
        Contoso University
      </Link>
      <Link className="nav-element" style={{color: `${headerColor}`}} to={"/app"}>
        Home
      </Link>
      <Link className="nav-element" style={{color: `${headerColor}`}} to={"/about"}>
        About
      </Link>
      <Link className="nav-element" style={{color: `${headerColor}`}} to={"/students"}>
        Students
      </Link>
      <Link className="nav-element" style={{color: `${headerColor}`}} to={"/courses"}>
        Courses
      </Link>
      <Link className="nav-element" style={{color: `${headerColor}`}} to={"/instructors"}>
        Instructors
      </Link>
      <Link className="nav-element" style={{color: `${headerColor}`}} to={"/departments"}>
        Departments
      </Link>
      </div>
    </div>
  );
}
