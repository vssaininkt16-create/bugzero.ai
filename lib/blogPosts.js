export const blogPosts = [
  {
    slug: 'vapt-testing-guide-india-2025',
    title: 'Complete VAPT Testing Guide for Indian Businesses in 2025',
    excerpt: 'Everything you need to know about Vulnerability Assessment and Penetration Testing (VAPT) for Indian enterprises — methodology, cost, compliance requirements, and how to choose the right provider.',
    content: `Vulnerability Assessment and Penetration Testing (VAPT) has become a critical requirement for Indian businesses in 2025. With rising cyberattacks targeting Indian enterprises, government mandates from CERT-In, and increasing compliance requirements, VAPT is no longer optional.

## What is VAPT?

VAPT combines two distinct security testing approaches:

**Vulnerability Assessment (VA):** Systematically identifies known vulnerabilities in your systems using automated scanning tools. It produces a prioritized list of security weaknesses.

**Penetration Testing (PT):** Goes beyond automated scanning to manually exploit vulnerabilities, simulating a real attacker. It validates the true risk of each finding.

## Why VAPT is Mandatory for Indian Businesses

The CERT-In (Indian Computer Emergency Response Team) directives now require organizations in critical sectors to conduct regular security audits. Additionally:

- RBI (Reserve Bank of India) mandates VAPT for banking and financial institutions
- SEBI requires cybersecurity audits for stockbrokers and exchanges
- IRDAI guidelines require insurers to conduct periodic security assessments
- DPDP Act (Digital Personal Data Protection Act) 2023 requires data protection measures

## VAPT Cost in India

VAPT pricing in India varies by scope:
- Web application VAPT: ₹25,000 – ₹1,50,000
- Network security assessment: ₹35,000 – ₹2,00,000
- Mobile app security testing: ₹30,000 – ₹1,20,000
- Enterprise comprehensive VAPT: ₹1,00,000+

## How to Choose a VAPT Provider in India

Look for these qualifications:
1. Certified ethical hackers (CEH, OSCP, CISSP)
2. DPIIT/Startup India recognized companies
3. Clear methodology and deliverables
4. Detailed remediation guidance
5. Re-testing included in the engagement`,
    category: 'VAPT',
    author: 'BugZero Security Team',
    datePublished: '2025-01-15',
    dateModified: '2025-03-01',
    readTime: '8 min read',
    tags: ['VAPT', 'Penetration Testing', 'India', 'Cybersecurity', 'Compliance'],
    image: '/blog/vapt-guide-india-2025.jpg',
    featured: true,
  },
  {
    slug: 'top-cybersecurity-threats-india-2025',
    title: 'Top 10 Cybersecurity Threats Facing Indian Organizations in 2025',
    excerpt: 'From ransomware targeting Indian banks to state-sponsored attacks on critical infrastructure — a comprehensive analysis of the top cybersecurity threats Indian businesses face in 2025.',
    content: `India has emerged as one of the most targeted countries for cyberattacks globally. According to CERT-In, India recorded over 1.3 million cybersecurity incidents in 2023 alone. In 2025, the threat landscape continues to evolve with sophisticated attack vectors targeting critical infrastructure and enterprises.

## 1. Ransomware Attacks on Critical Infrastructure

Ransomware remains the #1 threat to Indian organizations. Healthcare, government, and BFSI sectors are primary targets. Attackers demand multi-crore ransoms with threats of data exposure.

## 2. Supply Chain Attacks

Indian IT companies and their global clients are targeted through compromised software supply chains. The SolarWinds-style attacks have evolved to target Indian software vendors serving government and enterprises.

## 3. State-Sponsored APT Groups

Multiple nation-state threat actors actively target Indian government, defense, and critical infrastructure organizations. These include Transparent Tribe (Pakistan), APT41 (China), and Lazarus Group (North Korea).

## 4. UPI and Banking Fraud

India's digital payments ecosystem processes billions of transactions daily. Cybercriminals exploit phishing, SIM swapping, and API vulnerabilities to conduct financial fraud.

## 5. Cloud Misconfiguration Breaches

As Indian enterprises rapidly migrate to AWS, Azure, and GCP, misconfigured cloud resources — exposed S3 buckets, overpermissioned IAM roles — continue to cause major data breaches.

## How to Protect Your Organization

- Conduct regular VAPT assessments
- Implement zero-trust security architecture
- Deploy EDR/XDR solutions
- Train employees on security awareness
- Maintain an incident response plan`,
    category: 'Threat Intelligence',
    author: 'BugZero Security Team',
    datePublished: '2025-02-01',
    dateModified: '2025-03-15',
    readTime: '10 min read',
    tags: ['Threat Intelligence', 'Ransomware', 'India', 'Cybersecurity', 'APT'],
    image: '/blog/cybersecurity-threats-india-2025.jpg',
    featured: true,
  },
  {
    slug: 'bug-bounty-programs-guide',
    title: 'How to Start a Bug Bounty Program in India: Complete Guide for Organizations',
    excerpt: 'A step-by-step guide for Indian companies to design, launch, and manage effective bug bounty programs. Includes policy templates, reward structures, and vendor selection criteria.',
    content: `Bug bounty programs allow organizations to leverage the global security research community to identify vulnerabilities. India is seeing rapid adoption of bug bounty programs, driven by fintech companies, e-commerce giants, and government digital platforms.

## What is a Bug Bounty Program?

A bug bounty program is a crowdsourced security testing initiative where organizations reward security researchers (ethical hackers) for responsibly disclosing security vulnerabilities.

## Types of Bug Bounty Programs

**Public Programs:** Open to all researchers worldwide. Maximum coverage but requires significant triage resources.

**Private Programs:** Invite-only with vetted researchers. Better quality submissions with lower noise.

**Vulnerability Disclosure Program (VDP):** No monetary rewards — just a safe harbor for researchers to report bugs. Great starting point for organizations new to bug bounty.

## Steps to Launch a Bug Bounty Program in India

1. Define scope clearly — what assets are in scope
2. Create a vulnerability disclosure policy
3. Set up a communication channel for researchers
4. Define severity levels and reward ranges
5. Establish triage and remediation workflows
6. Launch with a private program first
7. Graduate to a public program after internal readiness

## Bug Bounty Reward Ranges (India)

- Critical vulnerabilities: ₹50,000 – ₹5,00,000+
- High severity: ₹15,000 – ₹50,000
- Medium severity: ₹5,000 – ₹15,000
- Low severity: ₹1,000 – ₹5,000`,
    category: 'Bug Bounty',
    author: 'BugZero Security Team',
    datePublished: '2025-02-20',
    dateModified: '2025-03-10',
    readTime: '7 min read',
    tags: ['Bug Bounty', 'VDP', 'India', 'Security Research'],
    image: '/blog/bug-bounty-guide-india.jpg',
    featured: false,
  },
  {
    slug: 'penetration-testing-vs-vulnerability-assessment',
    title: 'Penetration Testing vs Vulnerability Assessment: Key Differences Explained',
    excerpt: 'Many organizations confuse penetration testing with vulnerability assessment. This guide explains the key differences, when to use each, and how they complement each other for complete security.',
    content: `One of the most common questions we receive from Indian enterprises is: "What is the difference between penetration testing and vulnerability assessment?" While both are essential security testing methods, they serve different purposes and provide different levels of assurance.

## Vulnerability Assessment (VA)

**Purpose:** Identify and catalogue known vulnerabilities

**Method:** Primarily automated scanning using tools like Nessus, OpenVAS, Qualys

**Output:** List of vulnerabilities with severity ratings

**Duration:** 1-3 days for most environments

**Cost:** Lower (₹10,000 – ₹50,000)

**Best for:** Regular security hygiene, compliance requirements, quick risk snapshots

## Penetration Testing (PT)

**Purpose:** Simulate real-world attacks to validate security controls

**Method:** Manual testing + automated tools, with human creativity and expertise

**Output:** Exploited vulnerabilities, attack chains, business impact assessment

**Duration:** 1-4 weeks depending on scope

**Cost:** Higher (₹45,000 – ₹2,00,000+)

**Best for:** High-value applications, pre-launch security validation, compliance certification

## VAPT: The Best of Both

VAPT (Vulnerability Assessment and Penetration Testing) combines both approaches — providing both breadth (VA) and depth (PT) in a single engagement. This is the most common approach for Indian enterprises.

## When Do You Need What?

- **Quarterly:** Vulnerability assessments for all systems
- **Annually:** Full penetration testing for critical applications
- **Before launch:** VAPT for new applications/systems
- **After major changes:** Targeted testing for modified components`,
    category: 'Education',
    author: 'BugZero Security Team',
    datePublished: '2025-03-01',
    dateModified: '2025-03-15',
    readTime: '6 min read',
    tags: ['VAPT', 'Penetration Testing', 'Vulnerability Assessment', 'Guide'],
    image: '/blog/pentest-vs-va.jpg',
    featured: false,
  },
  {
    slug: 'cloud-security-best-practices-india',
    title: 'Cloud Security Best Practices for Indian Enterprises: AWS, Azure & GCP Guide',
    excerpt: 'A practical guide to securing your cloud infrastructure in India. Covers AWS, Azure, and GCP security configurations, IAM best practices, compliance requirements, and common misconfigurations to avoid.',
    content: `As Indian enterprises accelerate cloud adoption, security must be built into every layer of the cloud architecture. Misconfigured cloud services are responsible for over 80% of cloud security incidents in India.

## Common Cloud Security Mistakes in India

1. **Public S3 Buckets / Blob Storage:** Leaving storage publicly accessible exposes sensitive data
2. **Overpermissioned IAM roles:** Admin-level permissions for all services
3. **Unencrypted databases:** RDS instances without encryption at rest
4. **No MFA for root accounts:** Root/admin accounts accessible with just a password
5. **Missing CloudTrail/Activity logs:** No audit trail for security investigations

## AWS Security Best Practices

- Enable AWS Organizations with Service Control Policies (SCPs)
- Enforce MFA on all IAM users and the root account
- Use IAM roles instead of long-term access keys
- Enable AWS Config and CloudTrail in all regions
- Use VPC with private subnets for sensitive workloads
- Enable Amazon GuardDuty for threat detection

## Azure Security Best Practices

- Enable Azure Security Center / Defender for Cloud
- Use Azure AD Conditional Access policies
- Enable Azure Monitor and Activity Logs
- Use Managed Identities instead of service principals with secrets
- Apply Network Security Groups (NSGs) to all subnets

## GCP Security Best Practices

- Enable Cloud Audit Logs for all services
- Use Workload Identity Federation
- Enforce Organization Policies
- Enable Security Command Center
- Use VPC Service Controls for sensitive data

## Compliance Requirements for Cloud in India

Organizations using cloud in India must comply with:
- CERT-In guidelines for cloud security
- RBI guidelines for banking data in cloud
- SEBI cloud guidelines for financial services
- Data localization requirements under DPDP Act 2023`,
    category: 'Cloud Security',
    author: 'BugZero Security Team',
    datePublished: '2025-03-10',
    dateModified: '2025-03-20',
    readTime: '9 min read',
    tags: ['Cloud Security', 'AWS', 'Azure', 'GCP', 'India', 'Best Practices'],
    image: '/blog/cloud-security-india.jpg',
    featured: false,
  },
];

export function getBlogPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug) || null;
}

export function getAllBlogSlugs() {
  return blogPosts.map((p) => p.slug);
}

export function getFeaturedPosts() {
  return blogPosts.filter((p) => p.featured);
}
