import emailjs from '@emailjs/browser';
import { InquiryFormData } from '@/types';
import { siteConfig } from '@/config/site';

const serviceId = siteConfig.integrations.emailjs.serviceId || process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const templateId = siteConfig.integrations.emailjs.templateId || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const publicKey = siteConfig.integrations.emailjs.publicKey || process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

export const isEmailJSConfigured = Boolean(serviceId && templateId && publicKey);

export async function sendInquiryEmail(formData: InquiryFormData): Promise<{ success: boolean; simulated?: boolean; message: string }> {
  if (isEmailJSConfigured) {
    try {
      const templateParams = {
        from_name: formData.name,
        phone_number: formData.phone,
        service_type: formData.serviceType === 'home' ? '홈클리닝' : '사업장 클리닝',
        space_size: formData.spaceSize,
        service_date: formData.serviceDate,
        message: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      return { success: true, simulated: false, message: '견적 문의가 정상적으로 전송되었습니다.' };
    } catch (error) {
      console.error('EmailJS send error:', error);
      throw new Error('이메일 전송에 실패했습니다. 관리자에게 문의바랍니다.');
    }
  }

  // Fallback simulation mode
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    success: true,
    simulated: true,
    message: '테스트 모드: 견적 문의가 성공적으로 접수되었습니다. (API 키 설정 시 실제 이메일 발송)',
  };
}
