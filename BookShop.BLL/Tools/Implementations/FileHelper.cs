using BookShop.BLL.Tools.Interfaces;
using Microsoft.AspNetCore.Http;

namespace BookShop.BLL.Tools.Implementations
{
    public class FileHelper : IFileHelper
    {
        public FileHelper(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        private readonly IWebHostEnvironment _webHostEnvironment;

        public string GetPath(int id, string fileName)
        {
            string hexId = id.ToString("X16");
            return Path.Combine(_webHostEnvironment.WebRootPath, "Images", hexId[..4], hexId[4..8], hexId[8..12], hexId[12..] + fileName[fileName.LastIndexOf(".")..]);
        }

        public async Task<string> GetPathById(int id)
        {
            string hexId = id.ToString("X16");
            string path = Path.Combine(_webHostEnvironment.WebRootPath, "Images", hexId[..4], hexId[4..8], hexId[8..12]);

            return await Task.Run(() =>
            {
                return Directory.GetFiles(path, $"{hexId[12..]}.*")[0];
            });
        }

        public async Task<string> GetPathByIdClient(int id)
        {
            string hexId = id.ToString("X16");
            string path = Path.Combine(_webHostEnvironment.WebRootPath, "Images", hexId[..4], hexId[4..8], hexId[8..12]);

            string res = await Task.Run(() =>
            {
                try
                {
                    return Directory.GetFiles(path, $"{hexId[12..]}.*")[0];
                }
                catch
                {
                    return "";
                }
            });

            return res.Replace(_webHostEnvironment.WebRootPath, "");
        }

        public async Task CreateFile(IFormFile file, int id)
        {
            string path = GetPath(id, file.FileName);

            await Task.Run(() =>
            {
                Directory.CreateDirectory(Path.GetDirectoryName(path));
            });

            using var fileStream = new FileStream(path, FileMode.Create);

            await file.CopyToAsync(fileStream);
        }

        public async Task DeleteFiles(int id)
        {
            string fileName = await GetPathById(id);
            await Task.Run(() =>
            {
                File.Delete(fileName);
            });
        }
    }
}
