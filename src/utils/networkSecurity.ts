import axios from 'axios';

interface NetworkSecurityResult {
  firewall: {
    status: 'pass' | 'fail' | 'warning';
    details: string;
    openPorts: number[];
  };
  segmentation: {
    status: 'pass' | 'fail' | 'warning';
    details: string;
  };
  accessControl: {
    status: 'pass' | 'fail' | 'warning';
    details: string;
  };
  monitoring: {
    status: 'pass' | 'fail' | 'warning';
    details: string;
  };
}

export async function checkNetworkSecurity(networkRange: string): Promise<NetworkSecurityResult> {
  try {
    // Perform network security checks using Netlify function
    const response = await axios.post('/.netlify/functions/network-scan', {
      networkRange
    });

    const { data } = response;
    
    return {
      firewall: {
        status: data.openPorts.length > 10 ? 'warning' : 'pass',
        details: `Found ${data.openPorts.length} open ports`,
        openPorts: data.openPorts
      },
      segmentation: {
        status: data.segmentation.properly_configured ? 'pass' : 'warning',
        details: data.segmentation.details
      },
      accessControl: {
        status: data.accessControl.properly_configured ? 'pass' : 'warning',
        details: data.accessControl.details
      },
      monitoring: {
        status: data.monitoring.enabled ? 'pass' : 'warning',
        details: data.monitoring.details
      }
    };
  } catch (error) {
    console.error('Network security check failed:', error);
    return {
      firewall: {
        status: 'warning',
        details: 'Unable to check firewall configuration',
        openPorts: []
      },
      segmentation: {
        status: 'warning',
        details: 'Unable to check network segmentation'
      },
      accessControl: {
        status: 'warning',
        details: 'Unable to check access control configuration'
      },
      monitoring: {
        status: 'warning',
        details: 'Unable to check security monitoring'
      }
    };
  }
}