import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import Cookies from 'js-cookie'
import './index.css'

const headerLinksConstraint = [
  {id: 0, text: 'Home', link: '/'},
  {id: 1, text: 'Cart', link: '/cart'},
]

class Header extends Component {
  state = {isShowMobileMenu: false}

  toggleMobileMenuClose = () => {
    this.setState({isShowMobileMenu: false})
  }

  toggleMobileMenuOpen = () => {
    this.setState({isShowMobileMenu: true})
  }

  loggingOutUser = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  headerUnorderListItemsAndButton = () => {
    const {match} = this.props
    const {path} = match

    return (
      <ul className="header-menu-un-order-list-items">
        {headerLinksConstraint.map(each => (
          <li key={each.id}>
            <Link to={each.link}>
              <button
                className={`header-list-item-text ${
                  path === each.link ? 'active-header-css' : ''
                }`}
                type="button"
              >
                {each.text}
              </button>
            </Link>
          </li>
        ))}

        <li>
          <button
            onClick={this.loggingOutUser}
            className="logout-button-header"
            type="button"
          >
            Logout
          </button>
        </li>
      </ul>
    )
  }

  render() {
    const {isShowMobileMenu} = this.state

    return (
      <>
        <div className="complete-header-for-large">
          <Link to="/" className="text-Decoration-for-link">
            <button type="button" className="header-logo-image-container">
              <img
                src="https://res.cloudinary.com/dqmmxqwiq/image/upload/v1679851948/Tasty%20Kitchen%20React%20mini%20Project/Frame_274_cgiuza.png"
                alt="website logo"
              />
              <h1 className="tasty-kitchen-header-logo-text">Tasty Kitchens</h1>
            </button>
          </Link>
          <div className="menu-item-for-header">
            {this.headerUnorderListItemsAndButton()}
          </div>
        </div>
        <div className="complete-header-for-mobile-device">
          <div className="header-menu-mobile-show">
            <Link to="/" className="text-Decoration-for-link">
              <div className="header-logo-image-container-mobile">
                <img
                  src="https://res.cloudinary.com/dqmmxqwiq/image/upload/v1679851948/Tasty%20Kitchen%20React%20mini%20Project/Frame_274_cgiuza.png"
                  alt="logo"
                />
                <h1 className="tasty-kitchen-header-logo-text-mobile">
                  Tasty Kitchens
                </h1>
              </div>
            </Link>
            <button
              type="button"
              className="mobile-menu-button"
              onClick={this.toggleMobileMenuOpen}
            >
              <GiHamburgerMenu size={25} />
            </button>
          </div>
          {isShowMobileMenu ? (
            <div className="hidden-part-mobile-menu">
              {this.headerUnorderListItemsAndButton()}
              <button
                type="button"
                className="mobile-menu-button"
                onClick={this.toggleMobileMenuClose}
              >
                <AiFillCloseCircle size={25} />
              </button>
            </div>
          ) : null}
        </div>
      </>
    )
  }
}

export default withRouter(Header)
