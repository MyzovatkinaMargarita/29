import React, { useEffect } from 'react';
import styled from 'styled-components';


type ModalProps = {
  open: boolean;
  title: string;
  children?: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(16, 24, 40, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;


const Dialog = styled.div`
  position: relative;
  padding: 18px 20px;
  width: min(560px, 92vw);
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(16, 24, 40, 0.18);
  border: 1px solid #eaecf0;
`;


const Close = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
  padding: 4px 6px;
  color: #667085;
  &:hover { color: #101828; }
`;


const Head = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px; 

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #101828;
    line-height: 1.4;
    text-align: center;
    max-width: 80%;
  }
`;

const Body = styled.div``;


const Foot = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  width: 100%;
`;

export const Modal: React.FC<ModalProps> = ({ open, title, children, onClose, footer }) => {
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Overlay onMouseDown={onClose}>
      <Dialog 
        onClick={(e) => e.stopPropagation()} 
        role="dialog" 
        aria-modal="true" 
        aria-label={title}
      >
        <Close onClick={onClose}>&times;</Close>
        <Head>
          <h3>{title}</h3>
        </Head>
        
      
        {children && <Body>{children}</Body>}
        
        {footer && <Foot>{footer}</Foot>}
      </Dialog>
    </Overlay>
  );
};

import styled from "styled-components";

import { Modal } from "../ui/Modal";


type ConfirmModalProps = { 
  open: boolean; 
  text: string; 
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
};


const Actions = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;

const Btn = styled.button<{ tone?: "primary" | "ghost" }>`
  width: 50%;
  appearance: none;
  cursor: pointer;
  border-radius: 10px;
  font-size: 14px;
  padding: 12px 36px;
  border: 1px solid #eaecf0;
  background: ${({ tone }) => (tone === "primary" ? "#0e73f6" : "#fff")};
  color: ${({ tone }) => (tone === "primary" ? "#fff" : "#101828")};

  &:hover {
    background: ${({ tone }) => (tone === "primary" ? "#0b61cf" : "#f9fafb")};
  }
`;


export default function ConfirmModal({ 
  open, 
  text, 
  confirmLabel = "Подтвердить",
  cancelLabel = "Отмена",
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  return (
    <Modal
      open={open}
      title={text} // Шаг 13: Текст всегда идет в title
      onClose={onClose}
      footer={
        <Actions>
          <Btn onClick={onClose}>{cancelLabel}</Btn>
          <Btn tone="primary" onClick={onConfirm}>
            {confirmLabel}
          </Btn>
        </Actions>
      }
    />
  );
}





