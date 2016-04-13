import React, { Component, PropTypes } from 'react';

import powersStore from '../../../core/powers-store';

import {
  Panel,
  Modal,
  Glyphicon,
  Button
} from 'react-bootstrap';

import './index.scss';

export default class DelegateModal extends Component {

  constructor(props){
    super(props);
    this.state = {
      emails:[
        'stephane.allaire@zenika.com',
        'benoit.averty@zenika.com',
        'alexandre.baron@zenika.com',
        'julie.bourhis@zenika.com',
        'antoine.cailly@zenika.com',
        'corentin.cocoual@zenika.com',
        'guillaume.gerbaud@zenika.com',
        'armel.gouriou@zenika.com',
        'serge.hardy@zenika.com',
        'herri.heas@zenika.com',
        'alan.menant@zenika.com',
        'delphine.millet@zenika.com',
        'martin.mouterde@zenika.com',
        'maxime.odye@zenika.com',
        'kevin.pennarun@zenika.com',
        'benjamin.plouzennec@zenika.com',
        'mathieu.pousse@zenika.com',
        'sylvain.revereault@zenika.com',
        'herminael.rougier@zenika.com	',
        'erwann.thebault@zenika.com',
        'sandra.parlant@zenika.com',
        'benoit.travers@zenika.com'
      ]
    };
  }

  close() {
    this.props.onClose();
  }

  selectEmail(e) {
    var email = e.target.textContent;
    powersStore.givePower(this.props.subject, email).then( () => {
      this.close();
    })
  }

  render() {
    var renderEmail = (email,key) => {
      return (
        <li key={key} className="delegate-item" onClick={e =>this.selectEmail(e)}>{email}</li>
      )
    }
    return (
      <Modal show={this.props.show} onHide={()=>this.close()}>
          <Modal.Header closeButton>
            <Modal.Title>Délégation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Choisissez la personne à qui vous souhaitez déléguer votre vote.</p>
            <ul>
              {this.state.emails.map(renderEmail)}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>this.close()}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
  }
}
DelegateModal.propTypes= {
  show : PropTypes.bool.isRequired,
  onClose : PropTypes.func.isRequired,
  subject : PropTypes.object.isRequired
};
