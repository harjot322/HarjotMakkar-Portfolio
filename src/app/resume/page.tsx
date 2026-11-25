import { Column, Heading, Text, Button, Row, Badge, SmartLink } from "@once-ui-system/core";
import { person, baseURL } from "@/resources";
import { Meta } from "@once-ui-system/core";

export async function generateMetadata() {
  const metadata = Meta.generate({
    title: `Résumé - ${person.name}`,
    description: `Cloud SRE and Infrastructure Engineer résumé for ${person.name}`,
    baseURL: baseURL,
    path: "/resume",
    image: `/api/og/generate?title=${encodeURIComponent(`Résumé - ${person.name}`)}`,
  });
  return { ...metadata, alternates: { canonical: metadata.openGraph.url } };
}

export default function Resume() {
  return (
    <Column maxWidth="m" paddingY="12" gap="xl">
      {/* Header */}
      <Column gap="m" horizontal="center" align="center">
        <Heading variant="display-strong-l">{person.name}</Heading>
        <Text variant="display-default-xs" onBackground="neutral-weak">
          Cloud SRE &amp; Infrastructure Engineer
        </Text>
        <Row gap="8" wrap horizontal="center">
          <Badge>Delhi, India</Badge>
          <Badge>Remote · US EST overlap</Badge>
          <Badge>Open to opportunities</Badge>
        </Row>
        <Row gap="12" paddingTop="8">
          <Button
            href="mailto:harjotdesk@gmail.com"
            prefixIcon="email"
            label="harjotdesk@gmail.com"
            size="s"
            variant="secondary"
          />
          <Button
            href="https://github.com/harjot322"
            prefixIcon="github"
            label="GitHub"
            size="s"
            variant="secondary"
          />
          <Button
            href="https://linkedin.com/in/harjotmakkar322"
            prefixIcon="linkedin"
            label="LinkedIn"
            size="s"
            variant="secondary"
          />
        </Row>
        <Row paddingTop="8" gap="12">
          <Button
            href="/HarjotResume.pdf"
            prefixIcon="document"
            label="Download PDF Résumé"
            size="m"
            variant="primary"
            arrowIcon
          />
        </Row>
      </Column>

      {/* Summary */}
      <Column gap="s">
        <Heading as="h2" variant="display-strong-s">
          Summary
        </Heading>
        <Text variant="body-default-l" onBackground="neutral-weak">
          Cloud Site Reliability Engineer with hands-on experience across cloud infrastructure,
          Kubernetes, infrastructure automation, GitOps, CI/CD, observability, security controls,
          and data infrastructure. Contributed to large-scale cloud inventory automation, Kubernetes
          platform changes, backup and recovery improvements, security remediation, storage workflow
          optimization, and infrastructure cost reduction. Focused on building reliable, repeatable,
          and secure production operations.
        </Text>
      </Column>

      {/* Experience */}
      <Column gap="l">
        <Heading as="h2" variant="display-strong-s">
          Experience
        </Heading>

        <Column gap="m">
          <Row fillWidth horizontal="between" vertical="end">
            <Column gap="4">
              <Text variant="heading-strong-l">Cloud Site Reliability Engineer</Text>
              <Text variant="body-default-s" onBackground="brand-weak">
                Crecita (Remote)
              </Text>
            </Column>
            <Text variant="heading-default-xs" onBackground="neutral-weak">
              Nov 2024 - Present
            </Text>
          </Row>
          <Column as="ul" gap="8">
            {[
              "Contributed to a production Kubernetes platform cutover (AKS, FluxCD, Terraform) with zero service downtime.",
              "Modernized Kubernetes ingress from Nginx Ingress to Envoy Gateway with zero dropped requests during migration.",
              "Built Python-based cloud inventory automation across 400+ accounts using IAM role assumption and Kubernetes CronJobs - reducing reporting effort by up to 90%.",
              "Reworked a storage-transfer workflow from sequential to batch processing, reducing benchmark runtime from ~33 min to ~72 sec (~96% improvement).",
              "Contributed to event-streaming infrastructure cleanup across 50+ Azure Event Hubs in four environments.",
              "Improved OpenSearch backup reliability by adding automated restore-probe verification.",
              "Integrated DevSecOps gates using reusable GitHub Composite Actions with Wiz, Coverity, and Black Duck.",
              "Contributed to Schema Registry hardening, reducing 24 Critical and 150 High findings to zero in tracked scope.",
              "Defined SLIs, SLOs, and error budgets for CI/CD platforms using Prometheus, Grafana, Dynatrace, and OpenTelemetry.",
            ].map((item, i) => (
              <Text as="li" variant="body-default-m" key={i}>
                {item}
              </Text>
            ))}
          </Column>
        </Column>

        <Column gap="m">
          <Row fillWidth horizontal="between" vertical="end">
            <Column gap="4">
              <Text variant="heading-strong-l">AI &amp; Platform Engineering Intern</Text>
              <Text variant="body-default-s" onBackground="brand-weak">
                Edera (Remote Internship)
              </Text>
            </Column>
            <Text variant="heading-default-xs" onBackground="neutral-weak">
              Aug 2024 - Nov 2024
            </Text>
          </Row>
          <Column as="ul" gap="8">
            {[
              "Deployed a web platform into a production Kubernetes environment with containerized microservices and CI/CD release pipelines.",
              "Built developer and test workflow automation using Python, Bash, Docker, and Docker Compose.",
              "Worked on AI-assisted database workflows and predictive analytics prototypes using the Gemini API.",
            ].map((item, i) => (
              <Text as="li" variant="body-default-m" key={i}>
                {item}
              </Text>
            ))}
          </Column>
        </Column>
      </Column>

      {/* Skills */}
      <Column gap="m">
        <Heading as="h2" variant="display-strong-s">
          Technical Skills
        </Heading>
        {[
          {
            category: "Cloud Platforms",
            skills:
              "AWS (EC2, EKS, S3, IAM, CloudWatch, ECR, VPC, RDS) · Azure (AKS, Blob Storage, Azure Files, Event Hubs)",
          },
          {
            category: "Containers & Kubernetes",
            skills: "Kubernetes · Docker · Helm · AKS · EKS · Kubernetes CronJobs · Microservices",
          },
          {
            category: "Infrastructure as Code & GitOps",
            skills: "Terraform · OpenTofu · FluxCD · Weave GitOps · Helm · YAML",
          },
          {
            category: "CI/CD & Release Engineering",
            skills:
              "GitHub Actions · Reusable Composite Actions · GitLab CI/CD · Jenkins · JFrog Artifactory",
          },
          {
            category: "Observability & SRE",
            skills:
              "Prometheus · Grafana · OpenTelemetry · Dynatrace · ELK Stack · AWS CloudWatch · SLI/SLO/SLA · Incident Response",
          },
          {
            category: "Security & DevSecOps",
            skills:
              "Wiz · Coverity · Black Duck · HashiCorp Vault · IAM Role Assumption · Secrets Management",
          },
          {
            category: "Data & Streaming",
            skills:
              "OpenSearch · Apache Kafka · Strimzi · Azure Event Hubs · Debezium · Schema Registry · Liquibase",
          },
          {
            category: "Programming & Automation",
            skills: "Python · Bash · YAML · Go (familiarity) · React · Node.js",
          },
        ].map(({ category, skills }) => (
          <Text key={category} variant="body-default-l" style={{ lineHeight: "175%" }}>
            <Text as="span" variant="heading-strong-m">
              {category}:
            </Text>{" "}
            <Text as="span" onBackground="neutral-weak">
              {skills}
            </Text>
          </Text>
        ))}
      </Column>

      {/* Education */}
      <Column gap="m">
        <Heading as="h2" variant="display-strong-s">
          Education
        </Heading>
        <Row fillWidth horizontal="between" vertical="end">
          <Column gap="4">
            <Text variant="heading-strong-l">
              B.Tech, Computer Science and Engineering
            </Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Maharaja Agrasen Institute of Technology (MAIT) · GGSIPU, Delhi, India
            </Text>
          </Column>
          <Text variant="heading-default-xs" onBackground="neutral-weak">
            Expected 2027
          </Text>
        </Row>
      </Column>

      {/* Independent Projects */}
      <Column gap="m">
        <Heading as="h2" variant="display-strong-s">
          Independent Projects
        </Heading>
        <Column gap="4">
          <Row gap="8" vertical="center" wrap>
            <Text variant="heading-strong-l">ATS Certify</Text>
            <Badge effect={false}>Prototype · Coming Soon</Badge>
            <SmartLink href="/work/ats-certify-resume-engineering-platform">
              <Text variant="body-default-xs">Architecture Case Study →</Text>
            </SmartLink>
          </Row>
          <Text variant="body-default-m" onBackground="neutral-weak">
            Building a résumé engineering and validation platform that helps job seekers create
            clean, ATS-friendly résumés through structured parsing, deterministic validation checks,
            and targeted AI-assisted semantic feedback using the Gemini API.
          </Text>
        </Column>
      </Column>
    </Column>
  );
}
