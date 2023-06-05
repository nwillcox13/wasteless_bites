import React from 'react';


function MessageRow(props) {
  const when = new Date(props.message.timestamp);
  const isCurrentUser = props.message.client_id === props.currentClientId
  console.log(props.message)
  const userName = isCurrentUser ? 'You' : props.userName;
  return (
    <tr>
      <td>{userName}</td>
      <td>{when.toLocaleString()}</td>
      <td>{props.message.content}</td>
    </tr>
  )
}


class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      clientId: Number.parseInt(Math.random() * 10000000),
      connected: false,
      message: '',
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
  }

  connect() {
    if (this.loading && !this.state.connected) {
      return;
    }
    this.loading = true;
    // Should be an environment variable in the future
    const url = `ws://localhost:8000/chat/${this.state.clientId}`;
    this.socket = new WebSocket(url);
    this.socket.addEventListener('open', () => {
      this.setState({ connected: true });
      this.loading = false;
    });
    this.socket.addEventListener('close', () => {
      this.setState({ connected: false });
      this.loading = false;
      setTimeout(() => {
        this.connect();
      }, 1000);
    });
    this.socket.addEventListener('error', () => {
      this.setState({ connected: false });
      this.loading = false;
      setTimeout(() => {
        this.connect();
      }, 1000);
    });
    this.socket.addEventListener('message', message => {
      this.setState({
        messages: [
          JSON.parse(message.data),
          ...this.state.messages,
        ],
      });
    });
  }

  componentDidMount() {
    this.connect();
  }

  sendMessage(e) {
    e.preventDefault();
    this.socket.send(this.state.message);
    this.setState({ message: '' });
  }

  updateMessage(e) {
    this.setState({ message: e.target.value });
  }

  render() {
    return (
      <>
        <h1>Wasteless Chat</h1>
        <h2>{JSON.parse(atob(localStorage.getItem("authToken").split('.')[1])).account.first_name}</h2>
        <form onSubmit={this.sendMessage}>
            <input value={this.state.message}
                   className="form-control"
                   type="text"
                   id="messageText"
                   autoComplete="off"
                   onChange={this.updateMessage}/>
            <button disabled={!this.state.connected}
                    className="btn btn-primary">
              Send
            </button>
        </form>
        <h2>Messages</h2>
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Date/Time</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {this.state.messages.map(message => (
              <MessageRow key={message.clientId + message.timestamp}
                          message={message}
                          currentClientId={this.state.clientId} />
            ))}
          </tbody>
        </table>
      </>
    )
  }
}

export default Chat;
