import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 100% of viewport height */
  background:rgb(230, 192, 221); /* light gray background instead of gradient */
`;

export const Wrapper = styled.div`
  display: flex;
  background: #fff;
  border-radius: 12px;
//   padding: 2rem;
  width: 100%;

  @media (max-width: 576px) {
    width: 80%;
  }

  @media (max-width: 400px) {
    width: 90%;
    
  }
`;

export const Left = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;

  .login-image {
    width: 100%;
    height: 100vh;
  }

  @media (max-width: 1024px) {
    width: 40%;
    
  }

  @media (max-width: 576px) {
    display: none;
  }
`;

export const Circle = styled.div`
    width:400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(243, 116, 211, 0.5) 25%, rgba(4,148,250,0) 60%, transparent 100% );
    position: absolute;
    top: 25%;
    left: 60%;
    transform: translate(-50%, -50%);
    z-index: 0;

    @media (max-width: 1320px) {
        width:300px;
        height: 300px;
    }

    @media (max-width: 576px) {
        left: 20%;
      
    }
`;

export const SubCircle = styled.div`
    width:400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(243, 116, 211, 0.5) 25%, rgba(4,148,250,0) 60%, transparent 100% );
    position: absolute;
    top: 80%;
    right: -10%;
    transform: translate(-50%, -50%);
    z-index: 0;

    @media (max-width: 1320px) {
        width:300px;
        height: 300px;
        right: -16%;
    }

    @media (max-width: 576px) {
        right: -30%;
        display:none;
      
    }
`

export const Right = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 2rem;

  @media (max-width: 1024px) {
    width: 60%;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

export const Light = styled.div`
    padding: 2rem;
    width: 70%;
    margin: 0 auto;
    // border: 1px solid #ccc;
    // box-shadow: 1px 1px 4px 4px rgba(0, 0, 0, 0.05);
    border-radius:10px;

    @media (max-width: 1024px) {
        width: 100%;
    }

    @media (max-width: 576px) {
        width: 100%;
        padding: 0rem;
    }
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 6rem;
  color: #333;
  text-align: center;

`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  gap:1.5rem;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  background: #f1f1f1;
  border-radius: 25px;
  padding: 0.75rem 1rem;
//   margin-bottom: 1rem;

  i {
    margin-right: 0.75rem;
    color: #666;
  }
`;

export const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  font-size: 1rem;
  color: #333;
`;

export const Button = styled.button`
  background:rgb(243, 116, 211);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.75rem;
  font-weight: bold;
  font-size: 1rem;
  margin-top: 0.5rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: rgb(247, 76, 204);
  }
`;

export const LinkText = styled.p`
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: #888;
  text-align: right;
  cursor: pointer;

  .forgot-password-link {
    text-decoration: none;
    margin-right: 20px;
    
    &:hover {
        text-decoration: underline;
    }
  }
`;

export const BottomText = styled.p`
  margin-top: 2rem;
  font-size: 0.9rem;
  text-align: center;
  color: #333;
  cursor: pointer;
  font-weight: 500;
`;
