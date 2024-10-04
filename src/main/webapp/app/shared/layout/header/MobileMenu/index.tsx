import React, { useState, useCallback } from 'react';
import { Collapse, CardBody, Card } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import './style.css';

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
    title: 'menu.home',
    link: '/home',
  },
  {
    id: 2,
    title: 'menu.about',
    link: '/about',
  },
  {
    id: 3,
    title: 'menu.contactt',
    link: '/contact',
  },
  {
    id: 4,
    title: 'menu.wishlist',
    link: '/wishlist',
  },
  {
    id: 5,
    title: 'menu.cart',
    link: '/cart',
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
                  <Translate contentKey={item.title} />
                  {item.submenu ? <i className="fa fa-angle-right" aria-hidden="true"></i> : null}
                </p>
              ) : (
                <Link to={item.link || '#'}>
                  <Translate contentKey={item.title} />
                </Link>
              )}
              {item.submenu && (
                <Collapse isOpen={item.id === isOpen}>
                  <Card>
                    <CardBody>
                      <ul>
                        {item.submenu.map(submenu => (
                          <li key={submenu.id}>
                            <Link className="active" to={submenu.link}>
                              <Translate contentKey={submenu.title} />
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
