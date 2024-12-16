using BookShop.BLL.Models;
using BookShop.BLL.Tools.Implementations;
using BookShop.BLL.Tools.Interfaces;
using BookShop.DAL.Interfaces;
using BookShop.Shared.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookShop.BLL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        public BookController(IBookDAL bookDal, IFileHelper fileHelper)
        {
            _bookDal = bookDal;
            _fileHelper = fileHelper;
        }


        private readonly IBookDAL _bookDal;

        private readonly IFileHelper _fileHelper;

        [HttpGet("{id}")]
        public async Task<ActionResult<ResponseBook>> Get(int id)
        {
            BookDTO? book = await _bookDal.GetById(id);
            if (book == null)
            {
                return NotFound();
            }

            ResponseBook result = new ResponseBook();

            result.MapFromDto(book);

            foreach (ImageDTO image in book.Images)
            {
                result.ImgFilesSrc.Add(await _fileHelper.GetPathByIdClient(image.Id));
            }

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResponseBook>>> Get([FromQuery]FilterDTO filter,  int pageNumber, int pageSize)
        {
            if (pageNumber <= 0 || pageSize <= 0)
            {
                return BadRequest();
            }

            var books = await _bookDal.GetWithFilterAndPagination(filter, pageNumber, pageSize);

            var result = books.Select(book => 
            {
                ResponseBook resBook = new ResponseBook();
                resBook.MapFromDto(book);
                return resBook;
            }).ToList();

            for (int i = 0; i < result.Count(); i++)
            {
                result[i].MainImageSrc = await _fileHelper.GetPathByIdClient(books[i].Images[0].Id);
            }

            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromForm]FormBook book)
        {
            try
            {
                BookDTO bookDto = book.MapToDto();

                List<int> ids = await _bookDal.Create(bookDto);

                for (int i = 0; i < ids.Count(); i++)
                {
                    IFormFile formFile = (i == 0) ? book.MainImage! : book.ImgFiles[i - 1];
                    await _fileHelper.CreateFile(formFile, ids[i]);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Created();
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update([FromForm]FormBook book)
        {
            try
            {
                BookDTO bookDto = book.MapToDto();

                (List<int> deletedIds, List<int> addedIds) = await _bookDal.Update(bookDto);

                foreach (int id in deletedIds)
                {
                    await _fileHelper.DeleteFiles(id);
                }

                for (int i = 0; i < addedIds.Count(); i++)
                {
                    IFormFile formFile;

                    if (book.MainImage != null)
                    {
                        formFile = (i == 0) ? book.MainImage! : book.ImgFiles[i - 1];
                    }
                    else
                    {
                        formFile = book.ImgFiles[i];
                    }

                    await _fileHelper.CreateFile(formFile, addedIds[i]);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                List<int> ids = await _bookDal.Delete(id);

                foreach (int _id in ids)
                {
                    await _fileHelper.DeleteFiles(_id);
                }
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return NoContent();
        }
    }
}
