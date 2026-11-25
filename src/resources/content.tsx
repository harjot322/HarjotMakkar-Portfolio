import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";

const person: Person = {
  firstName: "Harjot",
  lastName: "Singh Makkar",
  name: `Harjot Singh Makkar`,
  role: "Cloud SRE & Infrastructure Engineer",
  avatar: "/images/harjot.jpg",
  email: "harjotdesk@gmail.com",
  location: "Asia/Kolkata", // IANA time zone identifier
  displayLocation: "New Delhi, India", // Display location for header and about page
  languages: ["English", "Hindi"], // optional: Leave the array empty if you don't want to display languages
  locale: "en", // BCP 47 language tag for the HTML lang attribute
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Technical Writing</>,
  description: <>Engineering insights on Kubernetes, GitOps, cloud automation, and SRE practices.</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/harjot322",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://linkedin.com/in/harjotmakkar322",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:harjotdesk@gmail.com`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Cloud SRE and Infrastructure Engineer focused on Kubernetes, GitOps, Terraform, AWS, Azure, DevSecOps, and production reliability.`,
  headline: <>Building reliable, observable, and automated cloud platforms.</>,
  featured: {
    display: true,
    title: (
      <strong className="ml-4">Let's Connect · Schedule a 1:1 conversation</strong>
    ),
    href: "https://cal.com",
  },
  subline: (
    <>
      I'm {person.firstName}, a Cloud SRE working across AWS, Azure, Kubernetes, and GitOps.
      I turn fragile infrastructure operations into reliable, version-controlled workflows built for production.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About - ${person.name}`,
  description: `Cloud SRE and Infrastructure Engineer from Delhi, India. Focused on Kubernetes, GitOps, Terraform, observability, DevSecOps, and production reliability.`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I work at the intersection of Cloud Infrastructure, Platform Engineering, and Site Reliability Engineering.
        My experience includes operating production Kubernetes platforms, automating cloud operations across large
        account estates, improving backup and recovery workflows, strengthening security controls, and optimizing
        event-driven infrastructure.
        <br /><br />
        I approach infrastructure as software: changes should be version-controlled, declarative, observable, secure,
        testable, and recoverable. I care about operational ownership and measurable outcomes, not simply whether a
        deployment command completed successfully.
        <br /><br />
        Outside my infrastructure work, I am building ATS Certify - a résumé engineering and validation platform -
        and documenting engineering ideas through technical writing on Substack.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Crecita",
        timeframe: "Nov 2024 - Present",
        role: "Cloud Site Reliability Engineer",
        achievements: [
          <>
            Contributed to a large-scale production Kubernetes platform cutover using declarative GitOps and
            Terraform, coordinating staged reconciliation steps to preserve service availability with zero downtime.
          </>,
          <>
            Modernized Kubernetes ingress from Nginx Ingress to Envoy Gateway, managing controlled traffic transition
            and route validation to achieve zero dropped requests during migration.
          </>,
          <>
            Built Python-driven cloud inventory automation spanning 400+ accounts using IAM role assumption,
            Kubernetes CronJobs, and Grafana dashboards - reducing recurring reporting effort by up to 90%.
          </>,
          <>
            Reworked a large-scale storage-transfer workflow using validated batch processing, reducing a benchmark
            runtime from ~33 minutes to ~72 seconds - a ~96% improvement in throughput.
          </>,
          <>
            Contributed to event-streaming infrastructure cleanup across 50+ Azure Event Hubs in four environments,
            identifying idle resources and supporting Terraform-driven teardown to reduce recurring cloud spend.
          </>,
          <>
            Improved OpenSearch backup and recovery operations by combining scheduled snapshot automation and
            explicit restore-probe verification, replacing job-completion status as the sole success signal.
          </>,
          <>
            Integrated reusable GitHub Composite Actions with Wiz, Coverity, and Black Duck for DevSecOps gates,
            moving security and quality detection earlier into engineering workflows.
          </>,
          <>
            Contributed to Schema Registry hardening, remediating a backlog of 24 Critical and 150 High
            security findings to zero in the tracked scope.
          </>,
        ],
        images: [],
      },
      {
        company: "Edera (Remote Internship)",
        timeframe: "Aug 2024 - Nov 2024",
        role: "AI & Platform Engineering Intern",
        achievements: [
          <>
            Contributed to deploying a web platform into a production Kubernetes environment, working with
            containerized microservices, CI/CD release pipelines, and automated version bumping.
          </>,
          <>
            Built developer and test workflow automation using Python, Bash, Docker, and Docker Compose,
            improving deployment repeatability and reducing manual release friction.
          </>,
          <>
            Worked on AI-assisted database workflows and predictive analytics prototypes using the Gemini API.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Maharaja Agrasen Institute of Technology (MAIT)",
        description: (
          <>
            B.Tech, Computer Science and Engineering - Expected 2027.
            Affiliated with Guru Gobind Singh Indraprastha University (GGSIPU), Delhi, India.
          </>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Cloud Platforms & Kubernetes",
        description: (
          <>
            AWS (EC2, EKS, S3, IAM, CloudWatch, ECR, VPC, RDS) · Azure (AKS, Blob Storage, Azure Files,
            Event Hubs) · Kubernetes · Docker · Helm · AKS · EKS · Kubernetes CronJobs · Microservices deployment
          </>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Infrastructure as Code & GitOps",
        description: (
          <>
            Terraform · OpenTofu · FluxCD · Weave GitOps · Helm · YAML · Declarative infrastructure ·
            Git-driven deployment · Environment-specific configuration overlays · PR-based change workflows
          </>
        ),
        tags: [],
        images: [],
      },
      {
        title: "CI/CD & Release Engineering",
        description: (
          <>
            GitHub Actions · Reusable Composite Actions · GitLab CI/CD · Jenkins · JFrog Artifactory ·
            Automated version bumping · Release governance · Pipeline scripting · Makefile · Artifact distribution
          </>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Observability & SRE",
        description: (
          <>
            Prometheus · Grafana · OpenTelemetry · Dynatrace · ELK Stack / Kibana · AWS CloudWatch ·
            SLIs/SLOs/SLAs · Error budgets · Incident response · Root Cause Analysis · Backup & restore verification
          </>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Security & DevSecOps",
        description: (
          <>
            Wiz · Coverity · Black Duck · HashiCorp Vault · IAM role assumption · Secrets management ·
            Vulnerability remediation · Security and code-quality gates · Infrastructure and container scanning
          </>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Data & Streaming Infrastructure",
        description: (
          <>
            OpenSearch · Apache Kafka · Strimzi · Azure Event Hubs · Debezium · Schema Registry ·
            Liquibase · Apache Airflow · Snapshot and restore operations
          </>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Programming & Automation",
        description: (
          <>
            Python · Bash · YAML · Infrastructure automation · CI parsing and operational scripts ·
            Batch processing and validation workflows · Go (familiarity) · React · Node.js
          </>
        ),
        tags: [],
        images: [],
      },
    ],
  },
  certificates: {
    display: true, // Master toggle: set to false to completely remove from profile and Table of Contents
    title: "Certifications & Credentials",
    entries: [
      {
        title: "Certified Kubernetes Administrator (CKA)",
        issuer: "Cloud Native Computing Foundation (CNCF) / The Linux Foundation",
        timeframe: "Target / In Progress",
        credentialId: "LF-CKA-PENDING",
        link: "https://www.credly.com",
        icon: "kubernetes",
        image: "/images/certificates/cka.png",
        skills: [
          "Cluster Architecture",
          "Workloads & Scheduling",
          "Services & Networking",
          "Storage & Security",
          "Troubleshooting",
        ],
        description: (
          <>
            Demonstrates core competency in Kubernetes administration, cluster architecture, storage configuration, networking, and production-grade troubleshooting.
          </>
        ),
      },
      {
        title: "HashiCorp Certified: Terraform Associate (003)",
        issuer: "HashiCorp",
        timeframe: "Target / In Progress",
        credentialId: "HASHI-TA-PENDING",
        link: "https://www.credly.com",
        icon: "terraform",
        image: "/images/certificates/terraform.png",
        skills: [
          "Infrastructure as Code (IaC)",
          "HCL Syntax",
          "Terraform Modules",
          "State Management",
          "Terraform Cloud / Enterprise",
        ],
        description: (
          <>
            Validates foundational and advanced Infrastructure as Code (IaC) principles, module design, state locking, and multi-cloud provisioning workflows with Terraform.
          </>
        ),
      },
      {
        title: "AWS Certified DevOps Engineer - Professional (DOP-C02)",
        issuer: "Amazon Web Services (AWS)",
        timeframe: "Target / In Progress",
        credentialId: "AWS-DOP-PENDING",
        link: "https://www.credly.com",
        icon: "aws",
        image: "/images/certificates/aws-devops.png",
        skills: [
          "SDLC Automation",
          "Configuration Management",
          "Monitoring & Logging",
          "Incident & Event Response",
          "High Availability & DR",
        ],
        description: (
          <>
            Validates technical expertise in provisioning, operating, and managing distributed application systems on AWS with strict security controls and high availability.
          </>
        ),
      },
      {
        title: "Microsoft Certified: DevOps Engineer Expert (AZ-400)",
        issuer: "Microsoft",
        timeframe: "Target / In Progress",
        credentialId: "MS-AZ400-PENDING",
        link: "https://learn.microsoft.com",
        icon: "azure",
        image: "/images/certificates/azure-devops.png",
        skills: [
          "Azure DevOps & GitHub Enterprise",
          "Continuous Integration (CI)",
          "Continuous Delivery (CD)",
          "Dependency Management",
          "Security & Compliance",
        ],
        description: (
          <>
            Demonstrates expert-level ability to design and implement DevOps strategies for build, release, testing, and feedback mechanisms across cloud infrastructures.
          </>
        ),
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Writing",
  title: "Technical Writing on Cloud, SRE & Infrastructure...",
  description: `Engineering insights from ${person.name} on Kubernetes, GitOps, observability, and production reliability.`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects - ${person.name}`,
  description: `Cloud SRE and infrastructure engineering case studies by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Gallery - ${person.name}`,
  description: `A visual collection by ${person.name}`,
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
