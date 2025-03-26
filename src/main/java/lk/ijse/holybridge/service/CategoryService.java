package lk.ijse.holybridge.service;

import lk.ijse.holybridge.dto.CategoryDTO;
import java.util.List;

public interface CategoryService {
    int saveCategory(CategoryDTO categoryDTO);
    int updateCategory(CategoryDTO categoryDTO);
    int deleteCategory(int id);
    List<CategoryDTO> getAllCategories();
}