import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";

// Types for checklist items and PDF generation
export interface DocumentLink {
  title: string;
  url: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  regulatoryReference: string;
  regulator: string;
  riskLevel: "low" | "medium" | "high" | "critical";
  applicability: "mandatory" | "conditional" | "recommended";
  completed: boolean;
  dueDate?: Date;
  documentLinks?: DocumentLink[];
  tags?: string[];
  customItem?: boolean;
}

export interface ChecklistConfig {
  title: string;
  businessName: string;
  businessType: string;
  serviceTypes: string[];
  categories: string[];
  regulators: string[];
  includeConditional: boolean;
  includeRecommended: boolean;
  dueDateDefault?: Date;
  generatedDate: Date;
}

export interface PDFExportOptions {
  includeCompanyLogo?: boolean;
  includeRegulatorLogos?: boolean;
  includeIntroduction?: boolean;
  includeMetadata?: boolean;
  includeFooter?: boolean;
  colorScheme?: "default" | "monochrome" | "high-contrast";
  paperSize?: "a4" | "letter" | "legal";
  orientation?: "portrait" | "landscape";
}

/**
 * Generate a PDF from a checklist with clickable links to regulatory documents
 * 
 * @param items - The checklist items to include in the PDF
 * @param config - The configuration used to generate the checklist
 * @param options - Additional options for PDF generation
 * @returns A Promise that resolves when the PDF has been generated and downloaded
 */
export async function generateChecklistPDF(
  items: ChecklistItem[],
  config: ChecklistConfig,
  options: PDFExportOptions = {}
): Promise<void> {
  try {
    // Show loading toast
    toast({
      title: "Generating PDF",
      description: "Preparing your checklist for download...",
    });

    // In a production app, we would use a proper PDF library like jsPDF
    // For the hackathon demo, we'll simulate PDF generation with a timeout
    await simulatePDFGeneration(items, config, options);

    // Show success toast
    toast({
      title: "PDF Generated",
      description: "Your checklist has been downloaded with clickable document links.",
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    toast({
      title: "PDF Generation Failed",
      description: "There was an error generating your PDF. Please try again.",
      variant: "destructive",
    });
  }
}

/**
 * Simulate PDF generation for the hackathon demo
 * In a production app, this would be replaced with actual PDF generation code
 */
async function simulatePDFGeneration(
  items: ChecklistItem[],
  config: ChecklistConfig,
  options: PDFExportOptions
): Promise<void> {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));

  // For the hackathon demo, we'll use the browser's print functionality
  // to simulate PDF generation with a specially formatted HTML document
  
  // Create a new window for the printable content
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    throw new Error("Could not open print window. Please check your popup blocker settings.");
  }

  // Generate HTML content with clickable links
  const htmlContent = generatePrintableHTML(items, config, options);
  
  // Write the HTML to the new window
  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
  
  // Wait for resources to load
  printWindow.onload = () => {
    // Trigger print dialog
    printWindow.print();
    
    // Close the window after printing (or after a delay if user cancels)
    setTimeout(() => {
      if (!printWindow.closed) {
        printWindow.close();
      }
    }, 1000);
  };
}

/**
 * Generate HTML for printing that simulates a PDF with clickable links
 */
function generatePrintableHTML(
  items: ChecklistItem[],
  config: ChecklistConfig,
  options: PDFExportOptions
): string {
  const { 
    includeCompanyLogo = true,
    includeRegulatorLogos = true,
    includeIntroduction = true,
    includeMetadata = true,
    includeFooter = true,
    colorScheme = "default",
    orientation = "portrait"
  } = options;

  // Get counts by category, regulator, and risk level
  const categoryCounts = getCategoryCounts(items);
  const regulatorCounts = getRegulatorCounts(items);
  const riskLevelCounts = getRiskLevelCounts(items);

  // Format the date
  const formattedDate = format(config.generatedDate, "PPP");

  // Generate the HTML content with proper styling for a professional PDF
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Regulatory Compliance Checklist - ${config.businessName}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          line-height: 1.5;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: white;
        }
        
        @page {
          size: ${orientation === "portrait" ? "portrait" : "landscape"};
          margin: 2cm;
        }
        
        .container {
          max-width: 100%;
          margin: 0 auto;
          padding: 20px;
        }
        
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e2e8f0;
        }
        
        .header h1 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 10px;
          color: ${colorScheme === "monochrome" ? "#000" : "#1e40af"};
        }
        
        .header p {
          font-size: 14px;
          color: #64748b;
          margin: 5px 0;
        }
        
        .metadata {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 30px;
          padding: 15px;
          background-color: ${colorScheme === "high-contrast" ? "#f8fafc" : "#f1f5f9"};
          border-radius: 8px;
        }
        
        .metadata-item {
          margin-bottom: 10px;
        }
        
        .metadata-item strong {
          font-weight: 600;
          display: block;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #64748b;
        }
        
        .metadata-item span {
          font-size: 14px;
        }
        
        .intro {
          margin-bottom: 30px;
          font-size: 14px;
          color: #334155;
        }
        
        .summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-bottom: 30px;
        }
        
        .summary-card {
          padding: 15px;
          background-color: ${colorScheme === "high-contrast" ? "#f8fafc" : "#f1f5f9"};
          border-radius: 8px;
          text-align: center;
        }
        
        .summary-card h3 {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #64748b;
          margin-bottom: 5px;
        }
        
        .summary-card .value {
          font-size: 20px;
          font-weight: 700;
          color: ${colorScheme === "monochrome" ? "#000" : "#1e40af"};
        }
        
        .section {
          margin-bottom: 30px;
        }
        
        .section h2 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 15px;
          color: ${colorScheme === "monochrome" ? "#000" : "#1e40af"};
          padding-bottom: 8px;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .checklist-item {
          margin-bottom: 20px;
          padding: 15px;
          background-color: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          page-break-inside: avoid;
        }
        
        .checklist-item h3 {
          font-size: 16px;
          font-weight: 600;
          margin-top: 0;
          margin-bottom: 10px;
          color: ${colorScheme === "monochrome" ? "#000" : "#0f172a"};
        }
        
        .checklist-item p {
          font-size: 14px;
          margin: 8px 0;
          color: #334155;
        }
        
        .meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-top: 10px;
          font-size: 12px;
        }
        
        .meta-item {
          display: flex;
          align-items: center;
        }
        
        .meta-item strong {
          font-weight: 600;
          margin-right: 5px;
          color: #64748b;
        }
        
        .document-links {
          margin-top: 15px;
        }
        
        .document-links h4 {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #64748b;
        }
        
        .document-links ul {
          list-style-type: none;
          padding-left: 0;
          margin: 0;
        }
        
        .document-links li {
          margin-bottom: 5px;
        }
        
        .document-links a {
          font-size: 13px;
          color: ${colorScheme === "monochrome" ? "#000" : "#2563eb"};
          text-decoration: underline;
        }
        
        .tag {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
          margin-right: 5px;
          background-color: ${colorScheme === "monochrome" ? "#e2e8f0" : "#e0f2fe"};
          color: ${colorScheme === "monochrome" ? "#333" : "#0369a1"};
        }
        
        .risk-level {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
        }
        
        .risk-low {
          background-color: ${colorScheme === "monochrome" ? "#e2e8f0" : "#dcfce7"};
          color: ${colorScheme === "monochrome" ? "#333" : "#166534"};
        }
        
        .risk-medium {
          background-color: ${colorScheme === "monochrome" ? "#e2e8f0" : "#fef9c3"};
          color: ${colorScheme === "monochrome" ? "#333" : "#854d0e"};
        }
        
        .risk-high {
          background-color: ${colorScheme === "monochrome" ? "#e2e8f0" : "#fee2e2"};
          color: ${colorScheme === "monochrome" ? "#333" : "#b91c1c"};
        }
        
        .risk-critical {
          background-color: ${colorScheme === "monochrome" ? "#333" : "#7f1d1d"};
          color: white;
        }
        
        .footer {
          margin-top: 50px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          font-size: 12px;
          color: #64748b;
          text-align: center;
        }
        
        .page-break {
          page-break-after: always;
        }
        
        @media print {
          body {
            font-size: 12pt;
          }
          
          a {
            color: ${colorScheme === "monochrome" ? "#000" : "#2563eb"} !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          ${includeCompanyLogo ? '<img src="/logo.svg" alt="Logo" height="60" />' : ''}
          <h1>Regulatory Compliance Checklist</h1>
          <p>${config.businessName} - ${config.businessType}</p>
          <p>Generated on ${formattedDate}</p>
        </div>
        
        ${includeMetadata ? `
        <div class="metadata">
          <div>
            <div class="metadata-item">
              <strong>Business Name</strong>
              <span>${config.businessName}</span>
            </div>
            <div class="metadata-item">
              <strong>Business Type</strong>
              <span>${config.businessType}</span>
            </div>
            <div class="metadata-item">
              <strong>Service Types</strong>
              <span>${config.serviceTypes.join(", ")}</span>
            </div>
          </div>
          <div>
            <div class="metadata-item">
              <strong>Regulatory Categories</strong>
              <span>${config.categories.join(", ")}</span>
            </div>
            <div class="metadata-item">
              <strong>Regulators</strong>
              <span>${config.regulators.join(", ")}</span>
            </div>
            <div class="metadata-item">
              <strong>Total Requirements</strong>
              <span>${items.length}</span>
            </div>
          </div>
        </div>
        ` : ''}
        
        ${includeIntroduction ? `
        <div class="intro">
          <p>This checklist has been generated based on your business profile and selected regulatory categories. It provides a comprehensive overview of the compliance requirements applicable to your business. Each requirement includes links to the relevant regulatory documents for reference.</p>
          <p>Please note that this checklist is intended as a guide and does not constitute legal advice. We recommend consulting with a regulatory compliance specialist for specific guidance tailored to your business circumstances.</p>
        </div>
        ` : ''}
        
        <div class="summary">
          <div class="summary-card">
            <h3>Total Requirements</h3>
            <div class="value">${items.length}</div>
          </div>
          <div class="summary-card">
            <h3>High/Critical Risk</h3>
            <div class="value">${riskLevelCounts.high + riskLevelCounts.critical}</div>
          </div>
          <div class="summary-card">
            <h3>Regulators</h3>
            <div class="value">${Object.keys(regulatorCounts).length}</div>
          </div>
        </div>
        
        ${Object.entries(categoryCounts).map(([category, count]) => `
        <div class="section">
          <h2>${category} (${count})</h2>
          ${items
            .filter(item => item.category === category)
            .map(item => `
            <div class="checklist-item">
              <h3>${item.title}</h3>
              <p>${item.description}</p>
              <div class="meta-row">
                <div class="meta-item">
                  <strong>Regulator:</strong> ${item.regulator}
                </div>
                <div class="meta-item">
                  <strong>Reference:</strong> ${item.regulatoryReference}
                </div>
                <div class="meta-item">
                  <strong>Risk Level:</strong> 
                  <span class="risk-level risk-${item.riskLevel}">${item.riskLevel.toUpperCase()}</span>
                </div>
                <div class="meta-item">
                  <strong>Applicability:</strong> ${item.applicability}
                </div>
                ${item.dueDate ? `
                <div class="meta-item">
                  <strong>Due Date:</strong> ${format(new Date(item.dueDate), "PPP")}
                </div>
                ` : ''}
              </div>
              
              ${item.tags && item.tags.length > 0 ? `
              <div style="margin-top: 10px;">
                ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
              </div>
              ` : ''}
              
              ${item.documentLinks && item.documentLinks.length > 0 ? `
              <div class="document-links">
                <h4>Regulatory Documents:</h4>
                <ul>
                  ${item.documentLinks.map(link => `
                    <li>
                      <a href="${link.url}" target="_blank">${link.title}</a>
                    </li>
                  `).join('')}
                </ul>
              </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
        `).join('')}
        
        ${includeFooter ? `
        <div class="footer">
          <p>This document was generated by the Financial Services Regulatory Framework Portal.</p>
          <p>© ${new Date().getFullYear()} Bank of Botswana. All rights reserved.</p>
          <p>For assistance, contact regulatory-support@bob.bw or call +267 555-1234.</p>
        </div>
        ` : ''}
      </div>
    </body>
    </html>
  `;
}

/**
 * Count checklist items by category
 */
function getCategoryCounts(items: ChecklistItem[]): Record<string, number> {
  return items.reduce((counts, item) => {
    const category = item.category;
    counts[category] = (counts[category] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
}

/**
 * Count checklist items by regulator
 */
function getRegulatorCounts(items: ChecklistItem[]): Record<string, number> {
  return items.reduce((counts, item) => {
    const regulator = item.regulator;
    counts[regulator] = (counts[regulator] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
}

/**
 * Count checklist items by risk level
 */
function getRiskLevelCounts(items: ChecklistItem[]): Record<string, number> {
  return items.reduce((counts, item) => {
    const riskLevel = item.riskLevel;
    counts[riskLevel] = (counts[riskLevel] || 0) + 1;
    return counts;
  }, { low: 0, medium: 0, high: 0, critical: 0 });
}

/**
 * Export checklist as CSV
 */
export function exportChecklistCSV(
  items: ChecklistItem[],
  config: ChecklistConfig
): void {
  try {
    // Create CSV header row
    const headers = [
      "Title",
      "Description",
      "Category",
      "Subcategory",
      "Regulatory Reference",
      "Regulator",
      "Risk Level",
      "Applicability",
      "Completed",
      "Due Date",
      "Document Links"
    ].join(",");
    
    // Create CSV rows for each item
    const rows = items.map(item => {
      // Format document links as semicolon-separated list
      const documentLinksStr = item.documentLinks 
        ? item.documentLinks.map(link => `${link.title} (${link.url})`).join("; ")
        : "";
      
      // Format due date
      const dueDateStr = item.dueDate 
        ? format(new Date(item.dueDate), "yyyy-MM-dd")
        : "";
      
      return [
        `"${item.title.replace(/"/g, '""')}"`, // Escape quotes in CSV
        `"${item.description.replace(/"/g, '""')}"`,
        `"${item.category}"`,
        `"${item.subcategory || ""}"`,
        `"${item.regulatoryReference}"`,
        `"${item.regulator}"`,
        item.riskLevel,
        item.applicability,
        item.completed ? "Yes" : "No",
        dueDateStr,
        `"${documentLinksStr}"`
      ].join(",");
    }).join("\n");
    
    // Combine headers and rows
    const csvContent = `${headers}\n${rows}`;
    
    // Create a Blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `compliance_checklist_${format(new Date(), "yyyy-MM-dd")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "CSV Exported",
      description: "Your checklist has been exported as a CSV file."
    });
  } catch (error) {
    console.error("Error exporting CSV:", error);
    toast({
      title: "Export Failed",
      description: "There was an error exporting your checklist. Please try again.",
      variant: "destructive"
    });
  }
}
