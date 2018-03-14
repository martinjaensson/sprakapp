using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Utils
{
    public class ReadWriteFile
    {
        public static string ReadTxtFile(string filePath)
        {
            string text = "";
            if (!File.Exists(filePath))
            {
                File.Create(filePath).Close();
                return text;
            }
            else
            {
                var fileStream = new FileStream(@filePath, FileMode.Open, FileAccess.Read);
                using (var streamReader = new StreamReader(fileStream, System.Text.Encoding.GetEncoding(1252), true))
                {
                    text = streamReader.ReadToEnd();
                    text.Replace("/", @"\/");
                    fileStream.Close();
                    return text;
                }
                
            }
        }

        public static Boolean WriteToTxtFile(string write, string filePath)
        {
            if (File.Exists(filePath))
            {
                using (var tw = new StreamWriter(filePath, false, System.Text.Encoding.GetEncoding(1252)))
                {
                    tw.WriteLine(write);
                    tw.Close();
                }
                return true;
            }
            return false;
        }


        // Might be useful for later...
        private static bool IsFileLocked(FileInfo file)
        {
            FileStream stream = null;

            try
            {
                stream = file.Open(FileMode.Open, FileAccess.Read, FileShare.None);
            }
            catch (IOException)
            {
                //the file is unavailable because it is:
                //still being written to
                //or being processed by another thread
                //or does not exist (has already been processed)
                return true;
            }
            finally
            {
                if (stream != null)
                    stream.Close();
            }

            //file is not locked
            return false;
        }

    }



}

