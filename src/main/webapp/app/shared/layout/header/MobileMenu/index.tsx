import { useState, useCallback } from 'react';
import { Collapse, CardBody, Card } from 'reactstrap';
import { Link } from 'react-router-dom';
import './style.css';
import React from 'react';

interface SubMenu {
  id: number;
  title: string;
  link: string;
}

interface Menu {
  id: number;
  title: string;
  link?: string;
  submenu?: SubMenu[];
}

const menus: Menu[] = [
  {
    id: 1,
    title: 'Home',
    link: '/home',
  },
  {
    id: 2,
    title: 'About',
    link: '/about',
  },
  {
    id: 3,
    title: 'Contact',
    link: '/contact',
  },
];

const MobileMenu: React.FC = () => {
  const [isMenuShow, setIsMenuShow] = useState(false);
  const [isOpen, setIsOpen] = useState<number | null>(null);

  const menuHandler = useCallback(() => {
    setIsMenuShow(prevState => !prevState);
  }, []);

  const handleSubMenuToggle = useCallback(
    (id: number) => () => {
      setIsOpen(prevState => (prevState === id ? null : id));
    },
    [],
  );

  return (
    <div>
      <div className={`mobileMenu ${isMenuShow ? 'show' : ''}`}>
        <div className="menu-close">
          <div className="clox" onClick={menuHandler}>
            <i className="ti-close"></i>
          </div>
        </div>
        <ul className="responsivemenu">
          {menus.map(item => (
            <li key={item.id}>
              {item.submenu ? (
                <p onClick={handleSubMenuToggle(item.id)}>
                  {item.title}
                  {item.submenu ? <i className="fa fa-angle-right" aria-hidden="true"></i> : null}
                </p>
              ) : (
                <Link to={item.link || '#'}>{item.title}</Link>
              )}
              {item.submenu && (
                <Collapse isOpen={item.id === isOpen}>
                  <Card>
                    <CardBody>
                      <ul>
                        {item.submenu.map(submenu => (
                          <li key={submenu.id}>
                            <Link className="active" to={submenu.link}>
                              {submenu.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </CardBody>
                  </Card>
                </Collapse>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="showmenu" onClick={menuHandler}>
        <button type="button" className="navbar-toggler open-btn">
          <span className="icon-bar first-angle"></span>
          <span className="icon-bar middle-angle"></span>
          <span className="icon-bar last-angle"></span>
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
