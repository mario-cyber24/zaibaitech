import axios from 'axios';

interface EmailSecurityResult {
  spf: {
    status: 'pass' | 'fail' | 'warning';
    details: string;
  };
  dkim: {
    status: 'pass' | 'fail' | 'warning';
    details: string;
  };
  dmarc: {
    status: 'pass' | 'fail' | 'warning';
    details: string;
  };
  encryption: {
    status: 'pass' | 'fail' | 'warning';
    details: string;
  };
}

export async function checkEmailSecurity(domain: string): Promise<EmailSecurityResult> {
  try {
    // Check SPF record
    const spfResponse = await axios.get(`https://dns.google/resolve?name=${domain}&type=TXT`);
    const spfRecord = spfResponse.data.Answer?.find((record: any) => 
      record.data.includes('v=spf1')
    );

    // Check DKIM record
    const dkimResponse = await axios.get(`https://dns.google/resolve?name=default._domainkey.${domain}&type=TXT`);
    const dkimRecord = dkimResponse.data.Answer?.[0];

    // Check DMARC record
    const dmarcResponse = await axios.get(`https://dns.google/resolve?name=_dmarc.${domain}&type=TXT`);
    const dmarcRecord = dmarcResponse.data.Answer?.find((record: any) => 
      record.data.includes('v=DMARC1')
    );

    // Check MX records for encryption support
    const mxResponse = await axios.get(`https://dns.google/resolve?name=${domain}&type=MX`);
    const hasMXRecords = mxResponse.data.Answer?.length > 0;

    return {
      spf: {
        status: spfRecord ? 'pass' : 'fail',
        details: spfRecord ? 
          'SPF record found and properly configured' : 
          'No SPF record found or improperly configured'
      },
      dkim: {
        status: dkimRecord ? 'pass' : 'fail',
        details: dkimRecord ? 
          'DKIM record found and properly configured' : 
          'No DKIM record found or improperly configured'
      },
      dmarc: {
        status: dmarcRecord ? 'pass' : 'warning',
        details: dmarcRecord ? 
          'DMARC record found and properly configured' : 
          'No DMARC record found or improperly configured'
      },
      encryption: {
        status: hasMXRecords ? 'pass' : 'warning',
        details: hasMXRecords ? 
          'MX records found, email routing properly configured' : 
          'No MX records found, email routing may be misconfigured'
      }
    };
  } catch (error) {
    console.error('Email security check failed:', error);
    return {
      spf: {
        status: 'warning',
        details: 'Unable to check SPF configuration'
      },
      dkim: {
        status: 'warning',
        details: 'Unable to check DKIM configuration'
      },
      dmarc: {
        status: 'warning',
        details: 'Unable to check DMARC configuration'
      },
      encryption: {
        status: 'warning',
        details: 'Unable to check email encryption configuration'
      }
    };
  }
}