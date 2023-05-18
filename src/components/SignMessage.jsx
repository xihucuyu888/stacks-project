import { useConnect } from "@stacks/connect-react";
import { userSession } from "./ConnectWallet";
import { useState } from 'react';

const SignMessage = () => {
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState(null);
  const { sign } = useConnect();

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const signMessage = async () => { 
      sign({message,
        onFinish: (data) => {
            console.log("onFinish:", data);
            // show data
            setSignature(data.signature);
          },
          onCancel: () => {
            console.log("onCancel:", "Transaction was canceled");
          },
    })
  }

  if (!userSession.isUserSignedIn()) {
    return null;
  }

  return (
    <div>
      <h3>Sign Message</h3>
      <textarea
        value={message}
        onChange={handleChange}
        placeholder="请输入待签名的消息"
        className="message-input"
      />
      <button className="Sign" onClick={() => signMessage()}>
        sign
      </button>
      {signature && (
        <div>
          <p>签名结果：</p>
          <pre className="signature">{signature}</pre>
        </div>
      )}
    </div>
  );
};

export default SignMessage;
