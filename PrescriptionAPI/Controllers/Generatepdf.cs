using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Syncfusion.Drawing;
using Syncfusion.Pdf;
using Syncfusion.Pdf.Graphics;
using Syncfusion.Pdf.Grid;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PrescriptionAPI.Controllers
{
    public class Generatepdf : Controller
    {
        // GET: api/<controller>
        [HttpGet("generate/values")]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // POST api/<controller>
        
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpPost("generate/pdf")]
        [AllowAnonymous]
        public IActionResult Post([FromBody]Prescription prescription)
        {
            PdfDocument doc = new PdfDocument();

            PdfPage page = doc.Pages.Add();

            PdfGrid pdfGrid = new PdfGrid();

            PdfFont font = new PdfStandardFont(PdfFontFamily.Helvetica, 12);

            PdfGraphics graphics = page.Graphics;

            graphics.DrawString("Prescription from Dr. Sangeetha generated at "+DateTime.Now, font, PdfBrushes.Black, new PointF(0, 0));

            List<object> data = new List<object>();
            Object row1 = new { ID = "\n  PatientName", Name = "\n  " + prescription.Name + "\n" };
            Object row2 = new { ID = "\n  Age & gender", Name = "\n " + prescription.Age + "\n" };
            Object row3 = new { ID = "\n  Symptoms", Name = "\n  " + prescription.Symptoms + "\n" };
            Object row4 = new { ID = "\n  Diagnosis", Name = "\n  " + prescription.Diagnosis + "\n" };
            Object row5 = new { ID = "\n  Remarks", Name = "\n  " + prescription.Remarks + "\n" };
            data.Add(row1);
            data.Add(row2);
            data.Add(row3);
            data.Add(row4);
            data.Add(row5);
            //Add list to IEnumerable
            IEnumerable<object> dataTable = data;
            //Assign data source.
            pdfGrid.DataSource = dataTable;
            //Draw grid to the page of PDF document.
            pdfGrid.Draw(page, new Syncfusion.Drawing.PointF(10, 20));
            //Save the PDF document to stream
            MemoryStream stream = new MemoryStream();
            doc.Save(stream);
            //If the position is not set to '0' then the PDF will be empty.
            stream.Position = 0;
            //Close the document.
            doc.Close(true);
            //Defining the ContentType for pdf file.
            string contentType = "application/pdf";
            //Define the file name.
            string fileName = "Prescription.pdf";

            return File(stream, contentType, fileName);
        }

        [HttpPost("generate/email")]
        [EnableCors("_myAllowSpecificOrigins")]
        [AllowAnonymous]
        public String sendEmail([FromBody] Email Email_Prescription)
        {
            //Create a new PDF document.
            PdfDocument doc = new PdfDocument();

            //Add a page.
            PdfPage page = doc.Pages.Add();

            //Create a PdfGrid.
            PdfGrid pdfGrid = new PdfGrid();

            PdfFont font = new PdfStandardFont(PdfFontFamily.Helvetica, 12);

            PdfGraphics graphics = page.Graphics;

            graphics.DrawString("Prescription from Dr. Sangeetha generated at " + DateTime.Now, font, PdfBrushes.Black, new PointF(0, 0));

            //Add values to list
            List<object> data = new List<object>();
            Object row1 = new { ID = "\n  PatientName", Name = "\n  " + Email_Prescription.Name + "\n" };
            Object row2 = new { ID = "\n  Age & gender", Name = "\n " + Email_Prescription.Age + "\n" };
            Object row3 = new { ID = "\n  Symptoms", Name = "\n  " + Email_Prescription.Symptoms + "\n" };
            Object row4 = new { ID = "\n  Diagnosis", Name = "\n  " + Email_Prescription.Diagnosis + "\n" };
            Object row5 = new { ID = "\n  Remarks", Name = "\n  " + Email_Prescription.Remarks + "\n" };
            data.Add(row1);
            data.Add(row2);
            data.Add(row3);
            data.Add(row4);
            data.Add(row5);
            //Add list to IEnumerable
            IEnumerable<object> dataTable = data;
            //Assign data source.
            pdfGrid.DataSource = dataTable;
            //Draw grid to the page of PDF document.
            pdfGrid.Draw(page, new Syncfusion.Drawing.PointF(10, 20));
            //Save the PDF document to stream
            MemoryStream stream = new MemoryStream();
            doc.Save(stream);
            //If the position is not set to '0' then the PDF will be empty.
            stream.Position = 0;
            //Close the document.
            doc.Close(true);
            //Defining the ContentType for pdf file.
            string contentType = "application/pdf";
            //Define the file name.
            string fileName = "Prescription.pdf";
            //Creates a FileContentResult object by using the file contents, content type, and file name.

            try
            {
                using (MailMessage message = new MailMessage("coolestcucumber123@gmail.com", "coolestcucumber123@gmail.com"))
                {
                    message.Subject = "Prescription from Dr.Sangeetha";
                    message.Body = "The following Prescription was generated for patient "+Email_Prescription.Name+", "+Email_Prescription.Age+" at "+DateTime.Now;
                    message.IsBodyHtml = false;

                    //string filename = Path.GetFileName(model.Attachment.FileName);
                    message.Attachments.Add(new Attachment(stream, contentType));

                    using (SmtpClient smtp = new SmtpClient())
                    {
                        smtp.Host = "smtp.gmail.com";
                        smtp.EnableSsl = true;
                        NetworkCredential cred = new NetworkCredential("coolestcucumber123@gmail.com", "xxxxxxxxxxxxx");
                        smtp.UseDefaultCredentials = true;
                        smtp.Credentials = cred;
                        smtp.Port = 587;
                        smtp.Send(message);
                        Console.WriteLine("sent");
                    }
                }
            }
            catch (Exception e)
            {
                return "failure";
            }

            return "Success";

        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }

    public class Email : Prescription
    {
        string PatientEmail { get; set; }
    }

    public class Prescription
    {
        public string Name { get; set; }

        public string Age { get; set; }

        public string Symptoms { get; set; }

        public string Diagnosis { get; set; }

        public string Medication { get; set; }

        public string Remarks { get; set; }

    }
}
