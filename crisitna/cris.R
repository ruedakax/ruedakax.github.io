library(sunburstR)
packageVersion("sunburstR")
library(htmltools)
library(d3r)
setwd("~/R/proyectos/cris")
df <- read.csv("cris.tsv",sep = "\t",header = TRUE,encoding = "UTF-8",stringsAsFactors = FALSE)
final <- df[,c(12,7,5,8,10,3,4,2,1)]
knitr::kable(final)
tree <- d3_nest(final, value_cols = "id")
tree
write(tree,"final.json")

sb2 <- sunburst(
  tree,
  legend = FALSE,
  width = "100%",
  height = 400
)

# do side-by-side for comparison
my_div <- div(
  style="display: flex; align-items:center;",
  #div(style="width:50%; border:1px solid #ccc;", sb1),
  div(style="width:50%; border:1px solid #ccc;", sb2)
)

write(my_div,"diagrama.html")
write(tree,"final.json")
