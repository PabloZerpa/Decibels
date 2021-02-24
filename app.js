console.log("HOLA")

document.getElementById("searchBar").addEventListener("click", function()
{
    document.getElementById("searchOptions").style.display = "block";
})

document.getElementById("searchBar").addEventListener("mouseout", function()
{
    document.getElementById("searchOptions").style.display = "none";
})