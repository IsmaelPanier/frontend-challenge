import { useState, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import type { Campaign } from '../types/campaign';

export const usePinCode = () => {
  const { setValue, getValues, watch } = useFormContext<Campaign>();
  const [pinCode, setPinCode] = useState('');
  const [confirmPinCode, setConfirmPinCode] = useState('');
  const [isModifyingPin, setIsModifyingPin] = useState(false);

  const currentPin = watch('configuration.pin_code') || '';

  const validatePin = useCallback((pin: string): { isValid: boolean; message?: string } => {
    if (pin.length < 4 || pin.length > 6) {
      return { isValid: false, message: '❌ Le code PIN doit contenir entre 4 et 6 chiffres' };
    }

    const forbiddenCodes = ['0000', '1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888', '9999', '1234', '4321'];
    if (forbiddenCodes.includes(pin)) {
      return { isValid: false, message: '❌ Ce code PIN est trop évident. Choisissez un code plus sécurisé.' };
    }

    return { isValid: true };
  }, []);

  const savePinCode = useCallback((pin: string, confirmPin: string): { success: boolean; message: string } => {
    if (pin !== confirmPin) {
      return { success: false, message: '❌ Les codes PIN ne correspondent pas' };
    }

    const validation = validatePin(pin);
    if (!validation.isValid) {
      return { success: false, message: validation.message! };
    }

    // Sauvegarder le PIN dans la configuration de la campagne
    setValue('configuration.pin_code', pin);
    
    // Sauvegarder immédiatement dans localStorage pour persistance
    const currentData = getValues();
    const updatedData = {
      ...currentData,
      configuration: {
        ...currentData.configuration,
        pin_code: pin
      },
      updated_at: new Date().toISOString(),
    };
    localStorage.setItem('campaign', JSON.stringify(updatedData));
    
    return { 
      success: true, 
      message: `✅ Code PIN ${isModifyingPin ? 'modifié' : 'configuré'} avec succès !` 
    };
  }, [setValue, getValues, isModifyingPin, validatePin]);

  const initializePinModal = useCallback(() => {
    if (currentPin) {
      setIsModifyingPin(true);
      setPinCode('');
      setConfirmPinCode('');
    } else {
      setIsModifyingPin(false);
      setPinCode('');
      setConfirmPinCode('');
    }
  }, [currentPin]);

  const resetPinForm = useCallback(() => {
    setPinCode('');
    setConfirmPinCode('');
    setIsModifyingPin(false);
  }, []);

  return {
    pinCode,
    setPinCode,
    confirmPinCode,
    setConfirmPinCode,
    isModifyingPin,
    currentPin,
    savePinCode,
    initializePinModal,
    resetPinForm,
    validatePin
  };
}; 