import React from 'react';

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
    modal: {
        backgroundColor: 'white',
        width: '340px',
        height: '520px',
        borderRadius: '12px',
        padding: '30px 20px',
        position: 'relative',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: '15px',
        right: '15px',
        background: 'none',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#f26522',
        marginBottom: '40px',
    },
    options: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%',
        alignItems: 'center',
    },
    buttonBase: {
        width: '286.67px',
        height: '43px',
        border: 'none',
        borderRadius: '6px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        padding: 0,
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        pointerEvents: 'none',
    },
};

const LoginPan = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleLoginClick = (type) => {
        if (type === 'kakao') {
        }
        console.log(`${type} 로그인 시도`);
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <button style={styles.closeButton} onClick={onClose}>
                    ✕
                </button>
                <h2 style={styles.title}>UNKNOWN</h2>
                <div style={styles.options}>
                    <button
                        style={{ ...styles.buttonBase, backgroundColor: '#FEE500' }}
                        onClick={() => handleLoginClick('kakao')}
                    >
                        <img src={'/img/kakao.png'} alt='카카오' style={styles.image} />
                    </button>
                    <button
                        style={{ ...styles.buttonBase, backgroundColor: '#03C75A' }}
                        onClick={() => handleLoginClick('naver')}
                    >
                        <img src={'/img/naver.png'} alt='네이버' style={styles.image} />
                    </button>
                    <button
                        style={{ ...styles.buttonBase, backgroundColor: '#000000' }}
                        onClick={() => handleLoginClick('apple')}
                    >
                        <img src={'/img/apple.png'} alt='애플' style={styles.image} />
                    </button>
                    <button
                        style={{
                            ...styles.buttonBase,
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #ccc',
                        }}
                        onClick={() => handleLoginClick('google')}
                    >
                        <img src={'/img/google.png'} alt='구글' style={styles.image} />
                    </button>
                    <button
                        style={{ ...styles.buttonBase, backgroundColor: '#F26522', color: '#fff' }}
                        onClick={() => handleLoginClick('email')}
                    >
                        <img src={'/img/email.png'} alt='이메일' style={styles.image} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPan;
