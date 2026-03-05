import { useState, useEffect } from 'react';
import { Pack, Option, Subscription, MaintenanceOption, StepFormData, OrderData, Customer } from '../types/ecommerce';
import { DEFAULT_FORM_STEPS } from '../data/ecommerce-data';

const scrollToTop = () => {
  const scrollToTopImmediate = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  scrollToTopImmediate();
  setTimeout(scrollToTopImmediate, 100);
  setTimeout(scrollToTopImmediate, 300);
};

export const useEcommerce = () => {
  const [stepFormData, setStepFormData] = useState<StepFormData>({
    currentStep: 0,
    steps: DEFAULT_FORM_STEPS,
    formData: {},
    selectedPack: undefined,
    selectedOptions: [],
    selectedSubscriptions: [],
    selectedMaintenance: undefined,
    selectedSocialOptions: []
  });

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<OrderData[]>([]);

  useEffect(() => {
    const savedCustomer = localStorage.getItem('customer');
    const savedOrders = localStorage.getItem('orders');
    if (savedCustomer) setCustomer(JSON.parse(savedCustomer));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  const selectPack = (pack: Pack) => {
    setStepFormData(prev => ({ ...prev, selectedPack: pack }));
  };

  const selectMaintenance = (maintenance: MaintenanceOption) => {
    setStepFormData(prev => ({ ...prev, selectedMaintenance: maintenance }));
  };

  const selectSocialOptions = (options: MaintenanceOption[]) => {
    setStepFormData(prev => ({ ...prev, selectedSocialOptions: options }));
  };

  const toggleOption = (option: Option) => {
    setStepFormData(prev => {
      const exists = prev.selectedOptions.find(o => o.id === option.id);
      return {
        ...prev,
        selectedOptions: exists
          ? prev.selectedOptions.filter(o => o.id !== option.id)
          : [...prev.selectedOptions, option]
      };
    });
  };

  const toggleSubscription = (subscription: Subscription) => {
    setStepFormData(prev => {
      const exists = prev.selectedSubscriptions.find(s => s.id === subscription.id);
      return {
        ...prev,
        selectedSubscriptions: exists
          ? prev.selectedSubscriptions.filter(s => s.id !== subscription.id)
          : [...prev.selectedSubscriptions, subscription]
      };
    });
  };

  const updateFormData = (stepId: string, fieldData: Record<string, any>) => {
    setStepFormData(prev => ({
      ...prev,
      formData: { ...prev.formData, ...fieldData },
      steps: prev.steps.map(step =>
        step.id === stepId ? { ...step, isCompleted: true } : step
      )
    }));
  };

  const goToStep = (stepIndex: number) => {
    setStepFormData(prev => ({ ...prev, currentStep: stepIndex }));
    setTimeout(() => scrollToTop(), 100);
  };

  const nextStep = () => {
    setStepFormData(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, prev.steps.length - 1)
    }));
    setTimeout(() => scrollToTop(), 100);
  };

  const prevStep = () => {
    setStepFormData(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0)
    }));
    setTimeout(() => scrollToTop(), 100);
  };

  const calculateTotal = () => {
    const packPrice = stepFormData.selectedPack?.price || 0;
    const optionsPrice = stepFormData.selectedOptions.reduce((sum, o) => sum + o.price, 0);
    return packPrice + optionsPrice;
  };

  const calculateMonthlyTotal = () => {
    return stepFormData.selectedSubscriptions.reduce((sum, s) => sum + s.price, 0);
  };

  const createOrder = async (): Promise<OrderData> => {
    if (!stepFormData.selectedPack) {
      throw new Error('Aucun service selectionne');
    }

    const order: OrderData = {
      pack: stepFormData.selectedPack,
      options: stepFormData.selectedOptions,
      subscriptions: stepFormData.selectedSubscriptions,
      maintenance: stepFormData.selectedMaintenance,
      formData: stepFormData.formData,
      totalPrice: calculateTotal(),
      monthlyTotal: calculateMonthlyTotal(),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const existingOrders = JSON.parse(localStorage.getItem('all_orders') || '[]');
    const newOrders = [...existingOrders, order];
    localStorage.setItem('all_orders', JSON.stringify(newOrders));
    setOrders(newOrders);

    return order;
  };

  const resetForm = () => {
    setStepFormData({
      currentStep: 0,
      steps: DEFAULT_FORM_STEPS.map(step => ({ ...step, isCompleted: false })),
      formData: {},
      selectedPack: undefined,
      selectedOptions: [],
      selectedSubscriptions: [],
      selectedMaintenance: undefined,
      selectedSocialOptions: []
    });
  };

  const loginCustomer = (email: string) => {
    const savedCustomer = localStorage.getItem('customer');
    if (savedCustomer) {
      const customerData = JSON.parse(savedCustomer);
      if (customerData.email === email) {
        setCustomer(customerData);
        return true;
      }
    }
    return false;
  };

  const resetCustomerSession = () => {
    setCustomer(null);
  };

  function isFormValid(formData: any, currentStep: number): boolean {
    if (currentStep === 0) {
      return !!formData.firstName && !!formData.lastName && !!formData.email && !!formData.phone;
    }
    return true;
  }

  return {
    stepFormData,
    customer,
    orders,
    selectPack,
    selectMaintenance,
    selectSocialOptions,
    toggleOption,
    toggleSubscription,
    updateFormData,
    goToStep,
    nextStep,
    prevStep,
    calculateTotal,
    calculateMonthlyTotal,
    createOrder,
    resetForm,
    loginCustomer,
    resetCustomerSession,
    isFormValid,
    currentStep: stepFormData.steps[stepFormData.currentStep],
    isLastStep: stepFormData.currentStep === stepFormData.steps.length - 1,
    isFirstStep: stepFormData.currentStep === 0
  };
};
