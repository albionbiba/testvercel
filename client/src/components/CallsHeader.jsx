//Here you can build app component. For instance a header that will be used in every page can be created as a component
//and then import it in every page.
//use tsx for typescript and js or jsx for javascript files
import "../css/CallsHeader.css";
import waterImage from "../images/water.png";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Header({ links }) {
  return (
    <div className="header">
      <img src={waterImage} alt="water" width={'50px'} />
      {links.map((link, index) => (
        <Link key={index} to={link.path} className="font-bold text-blue-800">
          {link.text}
        </Link>
      ))}
    </div>
  );
}

Header.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};
